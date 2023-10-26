<script setup lang="ts">
const router = useRouter();
const cartStore = useCartStore();

const onClick = () => {
  router.push("/checkout");
};

const cartIsEmpty = computed(() => Object.keys(cartStore.cart).length === 0);
</script>

<template>
  <Modal
    :show-modal="cartStore.showCartModal"
    position="top-right"
    @close-modal="cartStore.closeCartModal"
    @mouse-over-modal="cartStore.clearCartTimeout"
  >
    <div>
      <div v-if="cartIsEmpty" class="p-6 md:p-8">
        <h6 class="mb-0">Your cart is empty</h6>
      </div>
      <ProductSummary v-else title="Cart" button-text="Checkout" @click="onClick" />
    </div>
  </Modal>
</template>
