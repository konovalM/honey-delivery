export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    weight: number;
    type: 'honey' | 'propolis' | 'pollen' | 'honeycomb';
    createdAt: string;
    updatedAt: string;
  }