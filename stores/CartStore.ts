import { useCookie } from "nuxt/app";

import { defineStore } from "pinia";
import { ProductsEnum } from "@enums";

interface Cart {
  [product: string]: number;
}

export const useCartStore = defineStore("CartStore", () => {
  const cart = useCookie<Cart>("AP_CART");

  if (typeof cart !== "object") cart.value = {} as Cart;

  function addToCart(productKey: keyof typeof ProductsEnum, qnt: number) {
    if (cart.value[productKey]) {
      cart.value[productKey] += qnt;
    } else {
      cart.value[productKey] = qnt;
    }
  }

  function removeFromCart(productKey: keyof typeof ProductsEnum, qnt: number) {
    if (cart.value[productKey]) {
      cart.value[productKey] -= qnt;
      if (cart.value[productKey] <= 0) {
        delete cart.value[productKey];
      }
    }
  }

  function clearCart() {
    cart.value = {};
  }

  return { cart, addToCart, removeFromCart, clearCart };
});
