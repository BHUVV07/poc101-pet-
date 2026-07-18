import os
import urllib.request

# Mapping of file names to their Google Drive IDs
mappings = {
    "IMG_8034.JPG": "1WASi1CUD4vzjvMv7XTDWDMhtlN_-aq0D",
    "IMG_8032.JPG": "1NhoZDEjUmQApwqYUxYHHSJeSy-l8z2Xt",
    "IMG_8015.JPG": "17DaNksvmr_0U_KHPlB-OktnwHgHxzwY4",
    "IMG_8012.JPG": "1G4LTrO2RszMe8Bvt5oISrTmiZRemmbOX",
    "IMG_8013.JPG": "1nJyk8ylVweIcEwI647aFOcDkhLWZF6dh",
    "IMG_8010.JPG": "1Sm6IvnLuHCtYsuW8QKHxnL041g2cXKYg",
    "IMG_8009.JPG": "1wMkASIMtqU4XWDvUr-DISwHsTxpIdd_l",
    "IMG_8011.JPG": "1JWRK9OQ1JPPt2gZ4jjBlhXZyUb_Q0dB0",
    "IMG_8029.JPG": "1-KZmc7nji0MwyGBOajKPVrqd-lKL3ope",
    "IMG_8028.JPG": "1_OUhUwn8wEsloAAea6YRnKk9XCVyQMoO",
    "IMG_8005.JPG": "1Xy3BKp5tI9WGtn_8ygqBMOpwFytyWcmY",
    "IMG_8007.JPG": "1Ls6IPvYkk4Uv6lB3t-ReII_tuDTPs6tT",
    "IMG_8017.JPG": "1ysV7DdtpNmLUTSkXP32Qv3TmutVxL_pR"
}

dest_dir = os.path.join(os.path.dirname(__file__), "public", "gallery", "pharma")
os.makedirs(dest_dir, exist_ok=True)

print("Starting download of", len(mappings), "images from Google Drive...")

for fname, fid in mappings.items():
    out_path = os.path.join(dest_dir, fname)
    if os.path.exists(out_path) and os.path.getsize(out_path) > 10000:
        print(f"  {fname} already exists and is non-empty. Skipping.")
        continue
    
    print(f"  Downloading {fname}...")
    download_url = f"https://docs.google.com/uc?export=download&id={fid}&confirm=t"
    
    try:
        # Using a User-Agent header to prevent Google Drive from blocking the request
        req = urllib.request.Request(
            download_url,
            headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        )
        with urllib.request.urlopen(req, timeout=30) as response:
            with open(out_path, 'wb') as f:
                f.write(response.read())
            print(f"    Saved {fname} ({os.path.getsize(out_path)} bytes)")
    except Exception as e:
        print(f"    Error downloading {fname}: {e}")

print("Done. All images are now in public/gallery/pharma/")
