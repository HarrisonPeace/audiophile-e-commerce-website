<script setup lang="ts">
const cartStore = useCartStore();
const productStore = useProductStore();

const emit = defineEmits(["onClick"]);

defineProps<{
  title: string;
  buttonText: string;
  showAdditionalInfo?: boolean;
}>();

const isEditing = ref(false);
const { convertPrice } = useHelpers();

const showConfirmRemoveAll = ref(false);

const toggleRemoveAll = () => {
  showConfirmRemoveAll.value = !showConfirmRemoveAll.value;
};

const setEditing = () => {
  isEditing.value = true;
};

const componentType = computed(() => {
  if (isEditing.value) return resolveComponent("FormKit");
  return "div";
});

const onSubmit = (newCart: { string: number }) => {
  cartStore.replaceCart(newCart);
};

const componentProps = computed(() => ({
  ...(isEditing.value && {
    type: "form",
    actions: false,
    value: cartStore.cart,
    "@submit": onSubmit,
  }),
}));

const products = computed(() => {
  return Object.keys(cartStore.cart).map(key => productStore.findProduct(key));
});

const totalCost = computed(() => {
  return products.value.reduce((acc, curr) => {
    return acc + (curr?.price ?? 0) * (cartStore.cart[curr?.key ?? ""] ?? 0);
  }, 0);
});
</script>

<template>
  <div class="relative px-6 py-8 md:px-8">
    <div class="mb-8 flex items-center justify-between">
      <h6 class="mb-0">{{ title }}</h6>
      <button
        class="opacity-60 transition-all hover:text-primary hover:opacity-100"
        @click="
          () => {
            isEditing ? toggleRemoveAll() : setEditing();
          }
        "
      >
        {{ isEditing ? "Remove All" : "Edit Cart" }}
      </button>
    </div>

    <component :is="componentType" class="flex flex-col gap-8" v-bind="componentProps">
      <div v-for="product in products" :key="product?.key" class="flex gap-4">
        <div class="h-16 w-16 rounded-lg bg-gray-medium p-3">
          <NuxtImg class="w-full" width="40" :src="`/images/products/${product?.key}/display.png`" />
        </div>
        <div class="flex flex-col">
          <p class="mb-0 font-bold">{{ product?.name }}</p>
          <p class="mb-0 opacity-60">$ {{ convertPrice(product?.price ?? 0) }}</p>
        </div>
        <div class="ml-auto">
          <div v-if="isEditing">
            <FormKit type="qntinput" :name="product?.key" min="1" max="10" />
          </div>
          <div v-if="!isEditing" class="opacity-60">x{{ cartStore.cart[product?.key ?? ""] }}</div>
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <div class="flex justify-between">
          <p class="mb-0 uppercase opacity-60">Total</p>
          <p class="mb-0 font-bold">$ {{ convertPrice(totalCost) }}</p>
        </div>
        <div v-if="showAdditionalInfo">
          <div class="flex justify-between">
            <p class="mb-0 uppercase opacity-60">Shipping</p>
            <p class="mb-0 font-bold">$ 50</p>
          </div>
          <div class="flex justify-between">
            <p class="mb-0 uppercase opacity-60">Grand Total</p>
            <p class="mb-0 font-bold">$ {{ convertPrice(totalCost + 50) }}</p>
          </div>
          <div class="mt-4 flex justify-between">
            <p class="mb-0 uppercase opacity-60">Vat (Included)</p>
            <p class="mb-0 font-bold text-primary">$ {{ convertPrice(Math.ceil(totalCost * 0.2)) }}</p>
          </div>
        </div>
      </div>

      <Button
        class="w-full"
        btn-style="primary"
        :type="isEditing ? 'submit' : 'button'"
        @click="() => (isEditing ? null : emit('onClick'))"
      >
        {{ isEditing ? "Save Changes" : buttonText }}
      </Button>
    </component>

    <div
      v-if="showConfirmRemoveAll"
      class="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-6 bg-dark bg-opacity-70 px-6 py-8 md:px-8"
    >
      <Button btn-style="primary" class="w-full" @click="cartStore.clearCart">Remove All</Button>
      <Button btn-style="primary" class="w-full" @click="toggleRemoveAll">Cancel</Button>
    </div>
  </div>
</template>
