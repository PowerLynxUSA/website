# /// script
# requires-python = ">=3.13"
# dependencies = [
#     "pillow>=12.3.0",
#     "pymupdf>=1.28.2",
# ]
# ///
import pymupdf as fitz
from PIL import Image

doc = fitz.open("attached_assets/POWERLYNX_2027_CATALOG_V1.0_1788289801614.pdf")
page = doc[0]
rect = fitz.Rect(60, 10, 220, 75)  # just the wolf/lightning icon
mat = fitz.Matrix(8, 8)
pix = page.get_pixmap(matrix=mat, clip=rect)
pix.save(".agents/outputs/mark_raw.png")

img = Image.open(".agents/outputs/mark_raw.png").convert("RGBA")
bg = img.getpixel((2, 2))
def close(a,b,tol=18):
    return all(abs(a[i]-b[i])<=tol for i in range(3))
newdata = [(255,255,255,0) if close(item, bg) else item for item in img.getdata()]
img.putdata(newdata)
bbox = img.getbbox()
img = img.crop(bbox)
img.save(".agents/outputs/mark_transparent.png")
print("size", img.size)
