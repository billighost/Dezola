import sys
import os
sys.stdout.reconfigure(encoding='utf-8')

from PIL import Image

PUBLIC_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public')
LOGO_PATH = os.path.join(PUBLIC_DIR, 'logo.png')
LOGO_TEXT_PATH = os.path.join(PUBLIC_DIR, 'logo-text.png')

BG_DARK = (13, 13, 13, 255)


def open_rgba(path):
    return Image.open(path).convert('RGBA')


def make_icon_on_bg(logo_rgba, size, bg_color, padding_ratio=0.12):
    canvas = Image.new('RGBA', (size, size), bg_color)
    pad = int(size * padding_ratio)
    inner = size - pad * 2
    logo_resized = logo_rgba.resize((inner, inner), Image.LANCZOS)
    canvas.paste(logo_resized, (pad, pad), logo_resized)
    return canvas


def make_og_image(logo_text_rgba, width, height, bg_color):
    canvas = Image.new('RGBA', (width, height), bg_color)
    pad_h = int(height * 0.2)
    pad_w = int(width * 0.1)
    max_w = width - pad_w * 2
    max_h = height - pad_h * 2
    orig_w, orig_h = logo_text_rgba.size
    scale = min(max_w / orig_w, max_h / orig_h)
    new_w = int(orig_w * scale)
    new_h = int(orig_h * scale)
    resized = logo_text_rgba.resize((new_w, new_h), Image.LANCZOS)
    x = (width - new_w) // 2
    y = (height - new_h) // 2
    canvas.paste(resized, (x, y), resized)
    return canvas


def save_png(img, path):
    img.convert('RGBA').save(path, 'PNG', optimize=True)
    name = os.path.basename(path)
    print(f'  OK  {name} ({img.size[0]}x{img.size[1]})')


def save_ico(imgs, path):
    ico_imgs = [img.convert('RGBA') for img in imgs]
    ico_imgs[0].save(
        path,
        format='ICO',
        sizes=[(img.size[0], img.size[1]) for img in ico_imgs],
        append_images=ico_imgs[1:]
    )
    print(f'  OK  {os.path.basename(path)} (multi-size ICO)')


def main():
    logo = open_rgba(LOGO_PATH)
    logo_text = open_rgba(LOGO_TEXT_PATH)

    print('DEZOLA STUDIO - Generating SEO & PWA images')
    print('---------------------------------------------')

    # --- Favicon PNGs ---
    print('Favicon PNGs:')
    for size in [16, 32, 180, 192, 512]:
        icon = make_icon_on_bg(logo, size, BG_DARK, padding_ratio=0.12)
        if size == 180:
            save_png(icon.convert('RGB').convert('RGBA'), os.path.join(PUBLIC_DIR, 'apple-touch-icon.png'))
        elif size == 192:
            save_png(icon, os.path.join(PUBLIC_DIR, 'android-chrome-192x192.png'))
        elif size == 512:
            save_png(icon, os.path.join(PUBLIC_DIR, 'android-chrome-512x512.png'))
        elif size in [16, 32]:
            save_png(icon, os.path.join(PUBLIC_DIR, f'favicon-{size}x{size}.png'))

    # --- favicon.ico ---
    print('favicon.ico:')
    ico_sizes = [16, 32, 48]
    ico_imgs = [make_icon_on_bg(logo, s, BG_DARK, padding_ratio=0.12) for s in ico_sizes]
    save_ico(ico_imgs, os.path.join(PUBLIC_DIR, 'favicon.ico'))

    # --- Open Graph image (1200x630) ---
    print('Open Graph / Social images:')
    og = make_og_image(logo_text, 1200, 630, BG_DARK)
    save_png(og, os.path.join(PUBLIC_DIR, 'og-image.png'))

    # --- Square OG (400x400) ---
    og_sq = make_og_image(logo_text, 400, 400, BG_DARK)
    save_png(og_sq, os.path.join(PUBLIC_DIR, 'og-image-square.png'))

    # --- Maskable icon (512x512, extra padding for safe zone) ---
    print('Maskable icon:')
    maskable = make_icon_on_bg(logo, 512, BG_DARK, padding_ratio=0.20)
    save_png(maskable, os.path.join(PUBLIC_DIR, 'maskable-icon.png'))

    print('---------------------------------------------')
    print('All images generated successfully!')


if __name__ == '__main__':
    main()
