import type { Product } from '@/types/product';

// For demo, use royalty-free CDN webp assets. In real app, replace with local optimized assets.
// Images chosen to approximate references; all are webp for performance.
const base = 'https://images.unsplash.com';
const img = (path: string, w = 1200) =>
  `${base}/${path}?auto=format&fit=crop&w=${w}&q=70`;

export const products: Product[] = [
  {
    id: 'lucknawi-chicken-biryani',
    title: 'Lucknawi Chicken Biryani',
    price: 300,
    category: 'Food',
    // Use transparent PNG for main and set preview to the NEXT product per carousel behavior
    imageMain: './images/biryaniimage.webp',
    imageAlt: 'Delicious Lucknawi Chicken Biryani with aromatic spices',
    imagePreviewTopRight: './images/secongbiryani.webp',
    accent: '#f59e0b',
  },
  {
    id: 'awadhi-mutton-biryani',
    title: 'Awadhi Mutton Biryani',
    price: 400,
    category: 'Food',
    imageMain: './images/secongbiryani.webp',
    imageAlt: 'Rich and flavorful Awadhi Mutton Biryani with tender meat',
    imagePreviewTopRight: './images/thirdbiryani.webp',
    accent: '#22c55e',
  },
  {
    id: 'dum-ke-biryani',
    title: 'Dum Ke Biryani',
    price: 450,
    category: 'Food',
    imageMain: './images/thirdbiryani.webp',
    imageAlt: 'Traditional Dum Ke Biryani slow-cooked to perfection',
    imagePreviewTopRight: './images/fourthbiryani.webp',
    accent: '#ef4444',
  },
  {
    id: 'kacche-gosht-ki-biryani',
    title: 'Kacche Gosht Ki Biryani',
    price: 500,
    category: 'Food',
    imageMain: './images/fourthbiryani.webp',
    imageAlt: 'Authentic Kacche Gosht Ki Biryani with raw meat cooking',
    imagePreviewTopRight: './images/biryaniimage.webp',
    accent: '#fb923c',
  },
];

export const categories = [
  'Lucknawi',
  'Hyderabadi',
  'Awadhi',
  'Kebabs',
  'Rolls',
] as const;


