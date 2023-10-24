import { useCookie } from "nuxt/app";
import { ref } from "vue";

import { defineStore } from "pinia";
import { ProductsEnum } from "@enums";

interface Cart {
  [product: string]: number;
}

export const useCartStore = defineStore("CartStore", () => {
  const cart = useCookie<Cart>("AP_CART") as Ref<Cart>;
  const showCartModal = ref(false);
  const cartTimeout = ref<ReturnType<typeof setTimeout> | undefined>();

  if (typeof cart.value !== "object") cart.value = {} as Cart;

  function addToCart(productKey: string, qnt: number) {
    if (cart.value[productKey]) {
      cart.value[productKey] += qnt;
    } else {
      cart.value[productKey] = qnt;
    }
    openCartModal(true);
  }

  function removeFromCart(productKey: keyof typeof ProductsEnum, qnt: number) {
    if (cart.value[productKey]) {
      cart.value[productKey] -= qnt;
      if (cart.value[productKey] <= 0) {
        delete cart.value[productKey];
      }
    }
  }

  function openCartModal(closeOnTimeout = false) {
    showCartModal.value = true;
    if (closeOnTimeout) {
      cartTimeout.value = setTimeout(() => {
        showCartModal.value = false;
      }, 1000);
    }
  }

  function toggleCartModal() {
    showCartModal.value = !showCartModal.value;
  }

  function closeCartModal() {
    showCartModal.value = false;
  }

  function clearCart() {
    cart.value = {};
  }

  function clearCartTimeout() {
    clearTimeout(cartTimeout.value);
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    toggleCartModal,
    closeCartModal,
    showCartModal,
    openCartModal,
    cartTimeout,
    clearCartTimeout,
  };
});
