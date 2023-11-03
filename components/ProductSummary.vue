<script setup lang="ts">
import { submitForm } from "@formkit/vue";

const cartStore = useCartStore();
const productStore = useProductStore();

const emit = defineEmits(["click"]);

defineProps<{
  title: string;
  buttonText: string;
  showAdditionalInfo?: boolean;
}>();

const isEditing = ref(false);
const { convertPrice, getTotalCost } = useHelpers();

const showConfirmRemoveAll = ref(false);

const toggleRemoveAll = () => {
  showConfirmRemoveAll.value = !showConfirmRemoveAll.value;
};

const setEditing = () => {
  isEditing.value = true;
};

const onSubmit = (newCart: { string: number }) => {
  cartStore.replaceCart(newCart);
  isEditing.value = false;
};

const products = computed(() => {
  return Object.keys(cartStore.cart).map(key => productStore.findProduct(key));
});

// Prevents hydration issues
const awaitMount = ref(false);
onMounted(() => {
  awaitMount.value = true;
});
</script>

<template>
  <div class="relative p-6 md:p-8 2xl:p-12" v-bind="$attrs">
    <div class="mb-8 flex items-center justify-between">
      <h6 class="mb-0">{{ title }}</h6>
      <button
        type="button"
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

    <FormKit
      v-if="awaitMount"
      id="productSummary"
      v-slot="{ value }"
      type="form"
      :actions="false"
      :value="cartStore.cart"
      @submit="onSubmit"
    >
      <Transition name="fade-move">
        <div v-if="awaitMount" class="flex flex-col gap-6">
          <div v-for="product in products" :key="product?.key" class="flex gap-4">
            <div class="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-medium p-3">
              <NuxtImg
                class="max-h-full w-full object-contain"
                height="100"
                :src="`/images/products/${product?.key}/display.png`"
              />
            </div>
            <div class="flex flex-col">
              <p class="mb-0 font-bold">{{ product?.name }}</p>
              <p class="mb-0 opacity-60">$ {{ convertPrice(product?.price ?? 0) }}</p>
            </div>
            <div class="ml-auto">
              <div v-if="isEditing">
                <FormKit type="qntinput" :name="product?.key" min="1" max="10" preserve />
              </div>
              <div v-if="!isEditing" class="opacity-60">x{{ cartStore.cart[product?.key ?? ""] }}</div>
            </div>
          </div>

          <div class="flex flex-col gap-1">
            <div class="flex justify-between">
              <p class="mb-0 uppercase opacity-60">Total</p>
              <p v-if="value && typeof value === 'number'" class="mb-0 font-bold">
                $ {{ convertPrice(getTotalCost(value, productStore.products)) }}
              </p>
            </div>
            <div v-if="showAdditionalInfo" class="flex flex-col gap-1">
              <div class="flex justify-between">
                <p class="mb-0 uppercase opacity-60">Shipping</p>
                <p class="mb-0 font-bold">$ {{ cartStore.shippingCost }}</p>
              </div>
              <div class="flex justify-between">
                <p class="mb-0 uppercase opacity-60">Vat (Included)</p>
                <p v-if="value && typeof value === 'number'" class="mb-0 font-bold">
                  $ {{ convertPrice(Math.ceil(getTotalCost(value, productStore.products) * 0.2)) }}
                </p>
              </div>
              <div class="mt-4 flex justify-between">
                <p class="mb-0 uppercase opacity-60">Grand Total</p>
                <p v-if="value && typeof value === 'number'" class="mb-0 font-bold text-primary">
                  $ {{ convertPrice(getTotalCost(value, productStore.products) + cartStore.shippingCost) }}
                </p>
              </div>
            </div>
          </div>

          <Button
            class="w-full"
            btn-style="primary"
            type="button"
            @click="
              () => {
                isEditing ? submitForm('productSummary') : emit('click');
              }
            "
          >
            {{ isEditing ? "Save Changes" : buttonText }}
          </Button>
        </div>
      </Transition>
    </FormKit>

    <div
      v-if="showConfirmRemoveAll"
      class="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-6 bg-dark bg-opacity-70 px-6 py-8 md:px-8"
    >
      <Button btn-style="primary" class="w-full" @click="cartStore.clearCart">Remove All</Button>
      <Button btn-style="primary" class="w-full" @click="toggleRemoveAll">Cancel</Button>
    </div>
  </div>
</template>
