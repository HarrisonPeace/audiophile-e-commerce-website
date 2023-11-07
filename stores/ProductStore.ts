import { defineStore } from "pinia";
import { ref } from "vue";

import type { Product } from "@interfaces";

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

    const returnRandomProduct = (): any => {
      return products.value[Math.floor(Math.random() * products.value.length)];
    };

    const suggestedProducts: Product[] = [];

    while (suggestedProducts.length < 3) {
      const randomProduct = returnRandomProduct();
      if (
        currentProductKey !== randomProduct.key &&
        suggestedProducts.every(product => product.key !== randomProduct.key)
      )
        suggestedProducts.push(randomProduct);
    }

    return suggestedProducts;
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
