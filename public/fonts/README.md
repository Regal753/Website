# Regalo Corporate Sans

`styles/fonts/noto-sans-jp-regalo-home.woff2` and `styles/fonts/noto-sans-jp-regalo-extra.woff2` are site-specific subsets of the Noto Sans JP variable font.

- Source: `https://github.com/google/fonts/blob/main/ofl/notosansjp/NotoSansJP%5Bwght%5D.ttf`
- Source retrieved: 2026-08-11
- Homepage subset: 537 unique characters found in the rendered homepage, including accessibility labels and metadata
- Extra subset: the remaining 227 unique characters found across the current Regalo website source files
- Supplement subset (`styles/fonts/noto-sans-jp-regalo-supplement.woff2`, added 2026-11-27): 23 characters used in the site source but missing from the two subsets above (for example 透 in the homepage heading). Built from Noto Sans JP variable 2.04 bundled with Windows, instanced to 400-700 weight; the home and extra subsets were left unchanged.
- Web optimization: only the used 400-700 weight range and horizontal `kern`/`palt` layout features are retained; legacy naming data and hinting are removed
- Font family used by the site: `Regalo Corporate Sans`
- License: SIL Open Font License 1.1; see `OFL.txt`

The custom family name is used because the distributed file is a modified subset rather than the original complete font.
