import { defineStore } from "pinia";
import { ref } from "vue";
import { useStorage } from "@vueuse/core";
import { ProductsEnum } from "@enums";

export const useProductStore = defineStore("ProductStore", () => {
  const cart = ref(useStorage("APCart", {}));

  const addToCart = (product: keyof typeof ProductsEnum, qnt: number) => {
    if (cart.value[product.name]) {
      cart.value[product.name].qnt += qnt;
    } else {
      cart.value[product.name] = { qnt, item: product };
    }
  };

  const removeFromCart = (product: keyof typeof ProductsEnum, qnt: number) => {
    if (cart.value[product.name]) {
      cart.value[product.name].qnt -= qnt;
      if (cart.value[product.name].qnt <= 0) {
        delete cart.value[product.name];
      }
    }
  };

  const clearCart = () => {
    cart.value = {};
  };

  return { cart, addToCart, removeFromCart, clearCart };
});
