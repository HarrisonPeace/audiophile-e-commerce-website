export interface Product {
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  features: string[];
  inTheBox: { qnt: number; item: string }[];
}

export interface Category {
  [key: string]: Product;
}

export interface Categories {
  earphones: Category;
  headphones: Category;
  speakers: Category;
}
