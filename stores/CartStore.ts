// import { defineStore } from "pinia";
// import { ref } from "vue";
// import { useStorage } from "@vueuse/core";
// import { ProductsEnum } from "@enums";

// interface Cart {
//    [product in keyof typeof ProductsEnum]?: number;
// }

// export const useCartStore = defineStore("ProductStore", () => {
//   const cart = ref<Cart>(useStorage("APCart", {}));

//   const addToCart = (product: keyof typeof ProductsEnum, qnt: number) => {
//     if (cart.value[product]) {
//       cart.value[product] += qnt;
//     } else {
//       cart.value[product] = qnt;
//     }
//   };

//   const removeFromCart = (product: keyof typeof ProductsEnum, qnt: number) => {
//     if (cart.value[product]) {
//       cart.value[product] -= qnt;
//       if (cart.value[product] <= 0) {
//         delete cart.value[product];
//       }
//     }
//   };

//   const clearCart = () => {
//     cart.value = {};
//   };

//   return { cart, addToCart, removeFromCart, clearCart };
// });
