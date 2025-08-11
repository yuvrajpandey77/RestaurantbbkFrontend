export interface Product {
  id: string;
  title: string;
  price: number;
  category:
    | 'Food'
    | 'Juice'
    | 'Pastry'
    | 'Snakes'
    | 'Drinks'
    | 'Coffee'
    | 'Tea'
    | 'Milkshake';
  imageMain: string;
  imageAlt: string;
  imagePreviewTopRight: string;
  accent: string;
}


