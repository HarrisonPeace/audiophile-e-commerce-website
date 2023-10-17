import { defineStore } from "pinia";
import { ref } from "vue";

import data from "@data";

export const useProductStore = defineStore("ProductStore", () => {
  const products = ref(data.products);
  return { products };
});
