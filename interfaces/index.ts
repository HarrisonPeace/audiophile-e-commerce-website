export interface Product {
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  features: string[];
  inTheBox: { qnt: number; item: string }[];
}
