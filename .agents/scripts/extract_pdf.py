# /// script
# requires-python = ">=3.13"
# dependencies = [
#     "pymupdf>=1.28.2",
# ]
# ///
import fitz
doc = fitz.open("attached_assets/POWERLYNX_2027_CATALOG_V1.0_1788289801614.pdf")
print("pages:", doc.page_count)
page = doc[0]
print("rect:", page.rect)
pix = page.get_pixmap(matrix=fitz.Matrix(2,2))
pix.save(".agents/outputs/cover.png")

# extract embedded images from first 3 pages
for i in range(min(3, doc.page_count)):
    p = doc[i]
    imgs = p.get_images(full=True)
    print(f"page {i} images:", len(imgs))
    for j, img in enumerate(imgs):
        xref = img[0]
        base = doc.extract_image(xref)
        ext = base["ext"]
        w = base.get("width")
        h = base.get("height")
        fname = f".agents/outputs/p{i}_img{j}.{ext}"
        with open(fname, "wb") as f:
            f.write(base["image"])
        print(fname, w, h)
