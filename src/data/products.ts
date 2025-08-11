import type { Product } from '@/types/product';

// For demo, use royalty-free CDN webp assets. In real app, replace with local optimized assets.
// Images chosen to approximate references; all are webp for performance.
const base = 'https://images.unsplash.com';
const img = (path: string, w = 1200) =>
  `${base}/${path}?auto=format&fit=crop&w=${w}&q=70`;

export const products: Product[] = [
  {
    id: 'burger-double-cheese',
    title: 'Lucknawi Chicken Biryani',
    price: 300,
    category: 'Food',
    // Use transparent PNG for main and set preview to the NEXT product per carousel behavior
    imageMain: './images/biryani.png',
    imageAlt: 'Juicy double chicken burger with cheese',
    imagePreviewTopRight: 'https://www.pngmart.com/files/22/Tossed-salad-PNG-File.png',
    accent: '#f59e0b',
  },
  {
    id: 'salad-vegetable',
    title: 'Vegetable Salad',
    price: 400,
    category: 'Food',
    imageMain: 'https://www.pngmart.com/files/22/Tossed-salad-PNG-File.png',
    imageAlt: 'Fresh vegetable salad bowl',
    imagePreviewTopRight: 'https://www.pngmart.com/files/1/Pizza-PNG-Photos.png',
    accent: '#22c55e',
  },
  {
    id: 'pizza-marinara',
    title: 'Marinara Pizza',
    price: 400,
    category: 'Food',
    imageMain: 'https://www.pngmart.com/files/1/Pepperoni-Pizza-PNG-Transparent-Image.png',
    imageAlt: 'Marinara pizza on wooden plate',
    imagePreviewTopRight: 'https://www.pngmart.com/files/5/Pancakes-Transparent-Background.png',
    accent: '#ef4444',
  },
  {
    id: 'juice-orange',
    title: 'Pancakes',
    price: 180,
    category: 'Food',
    imageMain: 'https://www.pngmart.com/files/5/Pancakes-Transparent-Background.png',
    imageAlt: 'Stack of pancakes',
    imagePreviewTopRight: 'https://www.pngmart.com/files/21/Coffee-Cup-PNG-Isolated-Image.png',
    accent: '#fb923c',
  },
  {
    id: 'pastry-choco',
    title: 'Coffee',
    price: 220,
    category: 'Coffee',
    imageMain: 'https://www.pngmart.com/files/21/Coffee-Cup-PNG-Isolated-Image.png',
    imageAlt: 'Coffee cup',
    imagePreviewTopRight:
      'https://static.vecteezy.com/system/resources/thumbnails/045/800/630/small/beer-in-glass-mug-3d-concept-free-png.png',
    accent: '#7c3aed',
  },

  // {
  //   id: 'tea-matcha',
  //   title: 'Matcha Tea',
  //   price: 160,
  //   category: 'Tea',
  //   imageMain: img('photo-1498804103079-a6351b050096'),
  //   imageAlt: 'Matcha green tea',
  //   imagePreviewTopRight: img('photo-1498804103079-a6351b050096', 800),
  //   accent: '#16a34a',
  // },
  // {
  //   id: 'shake-strawberry',
  //   title: 'Strawberry Milkshake',
  //   price: 190,
  //   category: 'Milkshake',
  //   imageMain: img('photo-1494314671902-399b18174975'),
  //   imageAlt: 'Strawberry milkshake',
  //   imagePreviewTopRight: img('photo-1494314671902-399b18174975', 800),
  //   accent: '#f43f5e',
  // },
];

export const categories = [
  'Food',
  'Juice',
  'Pastry',
  'Snakes',
  'Drinks',
  'Coffee',
  'Tea',
  'Milkshake',
] as const;


