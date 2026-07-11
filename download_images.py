from pathlib import Path
from urllib.request import Request, urlopen
from PIL import Image
import io

out_dir = Path('images')
out_dir.mkdir(exist_ok=True)

pairs = [
    ('hero-restaurant.jpg', 'https://picsum.photos/1200/800?random=1'),
    ('about-restaurant.jpg', 'https://picsum.photos/1200/800?random=2'),
    ('grilled-steak.jpg', 'https://picsum.photos/1200/800?random=3'),
    ('creamy-pasta.jpg', 'https://picsum.photos/1200/800?random=4'),
    ('classic-burger.jpg', 'https://picsum.photos/1200/800?random=5'),
    ('margherita-pizza.jpg', 'https://picsum.photos/1200/800?random=6'),
    ('chicken-salad.jpg', 'https://picsum.photos/1200/800?random=7'),
    ('chocolate-dessert.jpg', 'https://picsum.photos/1200/800?random=8'),
    ('chef-1.jpg', 'https://picsum.photos/1200/800?random=9'),
    ('chef-2.jpg', 'https://picsum.photos/1200/800?random=10'),
    ('chef-3.jpg', 'https://picsum.photos/1200/800?random=11'),
    ('customer-1.jpg', 'https://picsum.photos/1200/800?random=12'),
    ('customer-2.jpg', 'https://picsum.photos/1200/800?random=13'),
    ('customer-3.jpg', 'https://picsum.photos/1200/800?random=14'),
    ('reviews-background.jpg', 'https://picsum.photos/1200/800?random=15'),
]

for filename, url in pairs:
    req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urlopen(req, timeout=60) as response:
        data = response.read()
    image = Image.open(io.BytesIO(data)).convert('RGB')
    image.save(out_dir / filename, 'JPEG', quality=95)
    print(f'Updated {filename}')
