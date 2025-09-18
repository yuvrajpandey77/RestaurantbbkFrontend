export interface Product {
  id: string;
  title: string;
  price: number;
  category:
    | 'Tiles'
    | 'Marble'
    | 'Wall Tiles'
    | 'Floor Tiles'
    | 'Outdoor';
  imageMain: string;
  imageAlt: string;
  imagePreviewTopRight: string;
  accent: string;
  imageBg?: string;
}


