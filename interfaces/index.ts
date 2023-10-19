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

export interface FormKitContext<T> {
  _value: T;
  attrs: Record<string, any>;
  fns: {
    length: (obj: Record<PropertyKey, any>) => number;
    number: (value: any) => number;
    string: (value: any) => string;
    json: (value: any) => string | false;
  };
  handlers: {
    blur: () => void;
    touch: () => void;
    DOMInput: (e: Event) => void;
  };
  help?: string;
  id?: string;
  label?: string;
  messages?: Record<string, any>;
  node: {
    input: (value: T) => void;
  };
}
