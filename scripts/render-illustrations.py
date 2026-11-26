"""design/illustrations/*.svg から公開用画像を書き出す。

使い方（リポジトリ直下で）:
    python -X utf8 scripts/render-illustrations.py

必要なもの: PyMuPDF（fitz）、Pillow。ビルド時には実行せず、絵を直したときだけ手で実行する。
OGP画像の文字には Noto Sans JP（Windows標準の NotoSansJP-VF.ttf）を使う。
"""

from __future__ import annotations

import pathlib

import fitz
from PIL import Image, ImageDraw, ImageFont

ROOT = pathlib.Path(__file__).resolve().parents[1]
SRC = ROOT / "design" / "illustrations"
OUT = ROOT / "public" / "images"
FONT = pathlib.Path(r"C:\Windows\Fonts\NotoSansJP-VF.ttf")


def render(svg: pathlib.Path, width: int) -> Image.Image:
    page = fitz.open(str(svg))[0]
    zoom = width / page.rect.width
    pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), alpha=False)
    return Image.frombytes("RGB", (pix.width, pix.height), pix.samples)


def save_webp(img: Image.Image, path: pathlib.Path) -> None:
    img.save(path, "WEBP", quality=88, method=6)
    print(f"{path.relative_to(ROOT)}  {img.width}x{img.height}  {path.stat().st_size // 1024}KB")


def font(size: int, weight: int) -> ImageFont.FreeTypeFont:
    f = ImageFont.truetype(str(FONT), size)
    try:
        f.set_variation_by_axes([weight])
    except OSError:
        pass
    return f


def services() -> None:
    for name in ("music-cover", "sns-cover", "ai-cover"):
        svg = SRC / f"{name}.svg"
        save_webp(render(svg, 1350), OUT / "services" / f"{name}.webp")
        for w in (480, 640):
            save_webp(render(svg, w), OUT / "services" / f"{name}-{w}.webp")


def logos() -> None:
    # 白背景のロゴを透過にする（既に透過なら何もしない）
    for name in ("logo.webp", "logo-80.webp"):
        path = OUT / name
        img = Image.open(path).convert("RGBA")
        if img.getextrema()[3][0] < 255:
            continue
        gray = img.convert("L")
        alpha = gray.point(lambda v: max(0, min(255, round((250 - v) * 255 / 200))))
        ink = Image.new("RGBA", img.size, (35, 35, 35, 255))
        ink.putalpha(alpha)
        ink.save(path, "WEBP", lossless=True)
        print(f"{path.relative_to(ROOT)}  transparent  {path.stat().st_size // 1024}KB")


def ogp() -> None:
    # 1200x630。左に社名とキャッチ、右にヒーローの線画
    w, h = 1200, 630
    img = Image.new("RGB", (w, h), "#fbf8ee")
    art = render(SRC / "hero.svg", 600)  # 600x400
    mask = Image.new("L", art.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, art.width - 1, art.height - 1), 16, fill=255)
    img.paste(art, (w - 600 - 40, (h - 400) // 2), mask)
    d = ImageDraw.Draw(img)
    logo = Image.open(OUT / "logo.webp").convert("RGBA").resize((64, 64))
    img.paste(logo, (64, 92), logo)
    d.text((142, 100), "株式会社Regalo", font=font(34, 700), fill="#383b2e")
    lines = ["音楽の権利も、", "YouTube運用も、", "透明に。"]
    for i, line in enumerate(lines):
        d.text((64, 210 + i * 78), line, font=font(58, 700), fill="#383b2e")
    d.rectangle((64, 472, 140, 476), fill="#c98a3c")
    d.text((64, 496), "www.regalocom.net", font=font(22, 500), fill="#5d6051")
    save_webp(img, OUT / "hero.webp")


if __name__ == "__main__":
    services()
    logos()
    ogp()
