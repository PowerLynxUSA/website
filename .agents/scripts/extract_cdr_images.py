# /// script
# requires-python = ">=3.13"
# dependencies = ["pillow>=11.0.0"]
# ///
import re
import io
import sys
from PIL import Image

path = "attached_assets/POWERLYNX_2027_CATALOG_V1.0_9.02_1788377548228.cdr"
with open(path, "rb") as f:
    data = f.read()

starts = [m.start() for m in re.finditer(b'\xff\xd8\xff', data)]
eoi = b'\xff\xd9'

out_dir = ".agents/outputs/cdr_extract"
for i, s in enumerate(starts):
    e = data.find(eoi, s)
    if e == -1:
        continue
    e += 2
    chunk = data[s:e]
    try:
        im = Image.open(io.BytesIO(chunk))
        im.load()
        fname = f"{out_dir}/jpeg_{i:03d}_{im.size[0]}x{im.size[1]}.jpg"
        with open(fname, "wb") as out:
            out.write(chunk)
        print(i, s, len(chunk), im.size, im.mode, "->", fname)
    except Exception as ex:
        print(i, s, len(chunk), "ERROR", str(ex))
