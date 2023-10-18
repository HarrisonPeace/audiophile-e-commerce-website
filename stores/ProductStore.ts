import { defineStore } from "pinia";
import { ref } from "vue";

import { Products } from "@interfaces";

import data from "@data";

export const useProductStore = defineStore("ProductStore", () => {
  const products = ref<Products>(data.products);
  return { products };
});
