# /// script
# requires-python = ">=3.13"
# dependencies = [
#     "pymupdf>=1.28.2",
# ]
# ///
import pymupdf as fitz
doc = fitz.open("attached_assets/POWERLYNX_2027_CATALOG_V1.0_1788289801614.pdf")
for i in range(doc.page_count):
    p = doc[i]
    imgs = p.get_images(full=True)
    for j, img in enumerate(imgs):
        xref = img[0]
        base = doc.extract_image(xref)
        ext = base["ext"]
        fname = f".agents/outputs/page{i:02d}_img{j}.{ext}"
        with open(fname, "wb") as f:
            f.write(base["image"])
    print(i, len(imgs))
