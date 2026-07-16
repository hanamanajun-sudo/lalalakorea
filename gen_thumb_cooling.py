#!/usr/bin/env python3
"""Generate thumbnail for lalalakorea cooling guide."""
import os, textwrap
from PIL import Image, ImageDraw, ImageFont

out_dir = r"C:\Users\hanam\OneDrive\바탕 화면\클로드cowork\lalalakorea\public\images\k-beauty-cooling-guide"
os.makedirs(out_dir, exist_ok=True)

img = Image.new("RGB", (1200, 630), (255, 107, 157))
draw = ImageDraw.Draw(img)

# Decorative elements
for x, y, r in [(100, 100, 200), (800, 400, 180), (400, 600, 150), (1100, 50, 120)]:
    c = tuple(min(255, c + 40) for c in (220, 60, 120))
    draw.ellipse([x - r, y - r, x + r, y + r], fill=c)

try:
    font_sm = ImageFont.truetype(r"C:\Windows\Fonts\malgun.ttf", 20)
    font_cat = ImageFont.truetype(r"C:\Windows\Fonts\malgun.ttf", 22)
    font_t = ImageFont.truetype(r"C:\Windows\Fonts\malgun.ttf", 44)
except:
    font_sm = ImageFont.load_default()
    font_cat = ImageFont.load_default()
    font_t = ImageFont.load_default()

draw.text((40, 35), "LALALAKOREA", font=font_sm, fill=(255, 255, 255, 160))
draw.text((40, 70), "韓国コスメ", font=font_cat, fill=(255, 255, 255, 200))

wrapper = textwrap.TextWrapper(width=16)
lines = wrapper.wrap("2026年夏 冷蔵庫スキンケア クーリングコスメ解説")
y_start = 630 // 2 - (len(lines) * 52) // 2
for line in lines:
    draw.text((55, y_start), line, font=font_t, fill=(255, 255, 255))
    y_start += 56

out_path = os.path.join(out_dir, "thumbnail.jpg")
img.save(out_path, "JPEG", quality=90)
print(f"✅ thumbnail.jpg 생성 ({os.path.getsize(out_path) // 1024}KB)")
