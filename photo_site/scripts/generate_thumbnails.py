import os
from PIL import Image

# Configuration
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FOLDERS = ["35mm Film", "Graduation", "Wedding"]
SRC_ROOT = os.path.join(BASE_DIR, '..')
THUMB_ROOT = os.path.join(BASE_DIR, '..', 'thumbnails')
THUMB_SIZE = (400, 300)  # width, height (aspect ratio 4:3)

os.makedirs(THUMB_ROOT, exist_ok=True)

def crop_center(img, target_aspect):
    width, height = img.size
    current_aspect = width / height
    if current_aspect > target_aspect:
        # Crop width
        new_width = int(height * target_aspect)
        left = (width - new_width) // 2
        right = left + new_width
        top = 0
        bottom = height
    else:
        # Crop height
        new_height = int(width / target_aspect)
        top = (height - new_height) // 2
        bottom = top + new_height
        left = 0
        right = width
    return img.crop((left, top, right, bottom))

def make_thumbnail(src_path, dest_path):
    try:
        with Image.open(src_path) as img:
            img = img.convert('RGB')
            img = crop_center(img, THUMB_SIZE[0] / THUMB_SIZE[1])
            img = img.resize(THUMB_SIZE, Image.LANCZOS)
            img.save(dest_path, quality=85)
            print(f"Created thumbnail: {dest_path}")
    except Exception as e:
        print(f"Error processing {src_path}: {e}")

def process_folder(folder):
    src_folder = os.path.join(SRC_ROOT, folder)
    dest_folder = os.path.join(THUMB_ROOT, folder)
    os.makedirs(dest_folder, exist_ok=True)
    for fname in os.listdir(src_folder):
        if fname.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
            src_path = os.path.join(src_folder, fname)
            dest_path = os.path.join(dest_folder, fname)
            if not os.path.exists(dest_path):
                make_thumbnail(src_path, dest_path)

if __name__ == "__main__":
    for folder in FOLDERS:
        process_folder(folder)
    print("All thumbnails generated.")
