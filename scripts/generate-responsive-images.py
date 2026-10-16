"""Regenerate PERF-01 derivatives without modifying originals (Pillow 12.3.0).
Run from any directory: python scripts/generate-responsive-images.py
No crop, upscale or credit/metadata changes. Existing JPEG/PNG stay the fallback.
"""
from pathlib import Path
import json
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCES = ["cachoeira-da-laje_verified.jpg", "cachoeira-da-toca_verified.png",
           "mirante-do-coracao_verified.jpg", "pico-de-sao-sebastiao_verified.jpg"]
manifest = {}
for name in SOURCES:
    source = ROOT / "assets/images" / name
    image = ImageOps.exif_transpose(Image.open(source)).convert("RGB")
    widths = [w for w in (320, 640, 960, 1600) if w <= image.width]
    if image.width < 1600 and image.width not in widths:
        widths.append(image.width)
    entries = []
    for width in sorted(widths):
        output = source.with_name(f"{source.stem}-{width}w.webp")
        resized = image.resize((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS)
        resized.save(output, "WEBP", quality=85, method=6)
        entries.append({"width": width, "path": "assets/images/" + output.name, "bytes": output.stat().st_size})
    manifest["assets/images/" + name] = entries
helper = ROOT / "responsive-images.js"
text = helper.read_text(encoding="utf-8")
start = text.index("  const variants = ") + len("  const variants = ")
end = text.index(";\n  function responsiveImageAttrs", start)
helper.write_text(text[:start] + json.dumps(manifest, indent=2) + text[end:], encoding="utf-8", newline="\n")
print(json.dumps(manifest, indent=2))
