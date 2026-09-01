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
# crop top-left logo area generously, in PDF points (page is 612x790)
rect = fitz.Rect(60, 10, 260, 110)
mat = fitz.Matrix(6, 6)
pix = page.get_pixmap(matrix=mat, clip=rect)
pix.save(".agents/outputs/logo_raw.png")

# Trim whitespace/background using PIL
img = Image.open(".agents/outputs/logo_raw.png").convert("RGBA")
bg = img.getpixel((2, 2))
datas = img.getdata()
newdata = []
def close(a,b,tol=18):
    return all(abs(a[i]-b[i])<=tol for i in range(3))
for item in datas:
    if close(item, bg):
        newdata.append((255,255,255,0))
    else:
        newdata.append(item)
img.putdata(newdata)
bbox = img.getbbox()
img = img.crop(bbox)
img.save(".agents/outputs/logo_transparent.png")
print("size", img.size)
