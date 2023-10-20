import { defineStore } from "pinia";
import { ref } from "vue";

import { Product } from "@interfaces";

import data from "@data";

export const useProductStore = defineStore("ProductStore", () => {
  const products = ref<Product[]>(data.products);

  function findProduct(productKey: string): Product | undefined {
    return products.value.find(product => product.key === productKey);
  }

  function findProducts(key: keyof Product, searchValue: string | boolean): Product[] {
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

  return { products, findProduct, findProducts, findProductsFromCategory, findCategories };
});
