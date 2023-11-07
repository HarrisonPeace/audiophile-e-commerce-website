import { useCookie } from "nuxt/app";
import { ref } from "vue";

import { defineStore } from "pinia";

interface Cart {
  [product: string]: number;
}

export const useCartStore = defineStore("CartStore", () => {
  const cart = useCookie<Cart>("AP_CART");
  const shippingCost = ref(50);
  const showCartModal = ref(false);
  const cartTimeout = ref<ReturnType<typeof setTimeout> | undefined>();

  const productStore = useProductStore();

  if (typeof cart.value !== "object") cart.value = {} as Cart;

  function addToCart(productKey: string, qnt: number) {
    if (!productStore.findProduct(productKey)) return;

    if (cart.value[productKey]) {
      cart.value[productKey] += qnt;
    } else {
      cart.value[productKey] = qnt;
    }
    openCartModal(true);
  }

  function removeFromCart(productKey: string, qnt: number) {
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
      }, 2000);
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

  function replaceCart(newCart: Cart) {
    const checkedProducts: Cart = {};
    for (const productKey in newCart) {
      if (productStore.productExists(productKey)) {
        checkedProducts[productKey] = newCart[productKey];
      }

      cart.value = checkedProducts;
    }
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
    replaceCart,
    shippingCost,
  };
});
