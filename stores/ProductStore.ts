import { defineStore } from "pinia";
import { ref } from "vue";

import { Categories } from "@interfaces";

import data from "@data";

export const useProductStore = defineStore("ProductStore", () => {
  const products = ref<Categories>(data.products);
  return { products };
});
