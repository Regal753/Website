"""分割フォント（home / extra）に無い文字を、補助フォント1本にまとめて書き出す。

使い方（リポジトリ直下で）:
    python -X utf8 scripts/build-font-supplement.py

必要なもの: fontTools と brotli（pip install fonttools brotli）。
元フォント: Windows標準の Noto Sans JP 可変フォント（C:\\Windows\\Fonts\\NotoSansJP-VF.ttf）。
home / extra の2本は変更しない。文字が欠けると font.coverage.test.ts が失敗するので、そのときに実行する。
"""

from __future__ import annotations

import pathlib
import re

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = pathlib.Path(__file__).resolve().parents[1]
CSS = ROOT / "styles" / "corporate-font.css"
OUT = ROOT / "styles" / "fonts" / "noto-sans-jp-regalo-supplement.woff2"
SOURCE_FONT = pathlib.Path(r"C:\Windows\Fonts\NotoSansJP-VF.ttf")
SOURCES = ["components/*.tsx", "pages/*.tsx", "site.config.ts", "services.catalog.ts", "App.tsx", "index.html"]
FACE = re.compile(r"@font-face\s*\{(.*?)\}", re.S)


def parse_range(block: str) -> set[int]:
    found = re.search(r"unicode-range:\s*([^;]+);", block)
    covered: set[int] = set()
    for part in (found.group(1) if found else "").split(","):
        part = part.strip().removeprefix("U+")
        if not part:
            continue
        a, _, b = part.partition("-")
        covered.update(range(int(a, 16), int(b or a, 16) + 1))
    return covered


def strip_comments(text: str) -> str:
    text = re.sub(r"/\*.*?\*/", "", text, flags=re.S)
    return re.sub(r"^\s*//.*$", "", text, flags=re.M)


def used_chars() -> set[int]:
    chars: set[int] = set()
    for pattern in SOURCES:
        for f in ROOT.glob(pattern):
            chars.update(ord(c) for c in strip_comments(f.read_text(encoding="utf8")) if ord(c) > 0x7F)
    return chars


def main() -> None:
    css = CSS.read_text(encoding="utf8")
    faces = FACE.findall(css)
    base = set()
    for body in faces:
        if "regalo-supplement" not in body:
            base |= parse_range(body)
    need = sorted(used_chars() - base)
    print(f"supplement chars: {len(need)} {''.join(chr(c) for c in need)}")

    font = instancer.instantiateVariableFont(TTFont(str(SOURCE_FONT)), {"wght": (400, 700)})
    opts = subset.Options()
    opts.layout_features = ["kern", "palt"]
    opts.hinting = False
    opts.name_legacy = False
    opts.flavor = "woff2"
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=need)
    sub.subset(font)
    font.flavor = "woff2"
    font.save(str(OUT))
    print(f"saved {OUT.name} {OUT.stat().st_size} bytes")

    ranges = ", ".join(f"U+{c:X}" for c in need)
    block = (
        "@font-face {\n"
        "  font-family: 'Regalo Corporate Sans';\n"
        "  font-style: normal;\n"
        "  font-display: swap;\n"
        "  font-weight: 400 700;\n"
        "  src: url('./fonts/noto-sans-jp-regalo-supplement.woff2') format('woff2-variations');\n"
        f"  unicode-range: {ranges};\n"
        "}"
    )
    existing = [m for m in FACE.finditer(css) if "regalo-supplement" in m.group(1)]
    if existing:
        m = existing[0]
        css = css[: m.start()] + block + css[m.end():]
    else:
        css = css.rstrip("\n") + "\n\n" + block + "\n"
    CSS.write_text(css, encoding="utf8", newline="\n")


if __name__ == "__main__":
    main()
