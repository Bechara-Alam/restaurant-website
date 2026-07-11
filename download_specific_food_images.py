from pathlib import Path
from urllib.request import Request, urlopen
from PIL import Image
import io

out_dir = Path('images')
out_dir.mkdir(exist_ok=True)

pairs = [
    ('hero-restaurant.jpg', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'),
    ('about-restaurant.jpg', 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80'),
    ('grilled-steak.jpg', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80'),
    ('creamy-pasta.jpg', 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1200&q=80'),
    ('classic-burger.jpg', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80'),
    ('margherita-pizza.jpg', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80'),
    ('chicken-salad.jpg', 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=1200&q=80'),
    ('chocolate-dessert.jpg', 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=80'),
    ('chef-1.jpg', 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80'),
    ('chef-2.jpg', 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=80'),
    ('chef-3.jpg', 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80'),
    ('customer-1.jpg', 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80'),
    ('customer-2.jpg', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80'),
    ('customer-3.jpg', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80'),
    ('reviews-background.jpg', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80'),
]

for filename, url in pairs:
    req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urlopen(req, timeout=60) as response:
        data = response.read()
    image = Image.open(io.BytesIO(data)).convert('RGB')
    image.save(out_dir / filename, 'JPEG', quality=95)
    print(f'Updated {filename}')
