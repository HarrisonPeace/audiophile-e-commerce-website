import { defineStore } from "pinia";
import { ref } from "vue";

import { Product } from "@interfaces";

import data from "@data";

export const useProductStore = defineStore("ProductStore", () => {
  const products = ref<Product[]>(data.products);

  function findProduct(productKey: string): Product | undefined {
    return products.value.find(product => product.key === productKey);
  }

  function findProducts(
    key: keyof Product,
    searchValue: string | boolean | number | (string | number | Date)[]
  ): Product[] {
    if (Array.isArray(searchValue)) {
      return products.value.filter((product: Product) => {
        const value = product[key];
        //   Array filtering for booleans isn't needed
        if (typeof value === "boolean") {
          return false;
        }
        if (value instanceof Date) {
          return searchValue.some((search: any) => {
            if (search instanceof Date) {
              return search.getTime() === value.getTime();
            }
            return false;
          });
        }
        if (typeof value === "string" || typeof value === "number") {
          return searchValue.includes(value);
        }
        return false;
      });
    }
    return products.value.filter(product => product[key] === searchValue);
  }

  function findProductsFromCategory(category: string): Product[] {
    return findProducts("category", category);
  }

  function findCategories(): string[] {
    const categories: string[] = [];
    products.value.forEach(product => {
      if (!categories.includes(product.category)) {
        categories.push(product.category);
      }
    });
    return categories;
  }

  function getSuggestedProducts(currentProductKey: string): Product[] {
    const product = findProduct(currentProductKey);

    if (!product) return [];

    const returnRandomKey = (o: any): any => {
      const keys = Object.keys(o);
      return keys[Math.floor(Math.random() * keys.length)];
    };

    const suggestedProductKeys: string[] = [];

    while (suggestedProductKeys.length < 3) {
      const randomProductKey = returnRandomKey(products.value);
      if (!suggestedProductKeys.includes(randomProductKey) && currentProductKey !== randomProductKey)
        suggestedProductKeys.push(randomProductKey);
    }

    return findProducts("key", suggestedProductKeys);
  }

  const productExists = (productKey: string): boolean => {
    return products.value.some(product => product.key === productKey);
  };

  return {
    products,
    findProduct,
    findProducts,
    findProductsFromCategory,
    findCategories,
    getSuggestedProducts,
    productExists,
  };
});
