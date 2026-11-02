const fs = require('fs');
const path = require('path');
const https = require('https');

const dir = path.join(__dirname, '..', 'public', 'images', 'gallery');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const images = [
  { name: 'couple-1.jpg', url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80' },
  { name: 'couple-2.jpg', url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80' },
  { name: 'prewedding-1.jpg', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80' },
  { name: 'prewedding-2.jpg', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80' },
  { name: 'haldi-1.jpg', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80' },
  { name: 'haldi-2.jpg', url: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&w=1200&q=80' },
  { name: 'mehendi-1.jpg', url: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1200&q=80' },
  { name: 'mehendi-2.jpg', url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80' },
  { name: 'sangeet-1.jpg', url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80' },
  { name: 'sangeet-2.jpg', url: 'https://images.unsplash.com/photo-1545232979-fbf68fe9b1a2?auto=format&fit=crop&w=1200&q=80' },
  { name: 'wedding-1.jpg', url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80' },
  { name: 'wedding-2.jpg', url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80' },
  { name: 'reception-1.jpg', url: 'https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?auto=format&fit=crop&w=1200&q=80' },
  { name: 'reception-2.jpg', url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80' },
  { name: 'highlights-1.jpg', url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80' },
];

function download(img) {
  return new Promise((resolve) => {
    const dest = path.join(dir, img.name);
    const file = fs.createWriteStream(dest);
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    };

    https.get(img.url, options, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        https.get(res.headers.location, options, (res2) => {
          res2.pipe(file);
          file.on('finish', () => {
            file.close();
            const stat = fs.statSync(dest);
            console.log(`Downloaded ${img.name}: ${stat.size} bytes`);
            resolve(true);
          });
        }).on('error', () => resolve(false));
      } else if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          const stat = fs.statSync(dest);
          console.log(`Downloaded ${img.name}: ${stat.size} bytes`);
          resolve(true);
        });
      } else {
        console.error(`Failed ${img.name}: HTTP ${res.statusCode}`);
        file.close();
        resolve(false);
      }
    }).on('error', (err) => {
      console.error(`Error ${img.name}:`, err.message);
      file.close();
      resolve(false);
    });
  });
}

async function run() {
  for (const item of images) {
    await download(item);
  }
  console.log('All downloads completed!');
}

run();

