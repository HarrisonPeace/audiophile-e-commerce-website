<script setup lang="ts">
import { ProductCategories, Products } from "@enums";
import { Product } from "@interfaces";

const { productIsNew } = useHelpers();

const { products } = storeToRefs(useProductStore());

const props = defineProps<{
  productCategory: ProductCategories;
  product: Products;
  description: string;
}>();

const selectedProduct = computed(() => {
  const product = products.value[props.productCategory][props.product];
  if (typeof product === "string") throw new Error("Product not found");
  return product as Product;
});

const headerRef = ref<HTMLElement | null>(null);
const maxWidth = computed(() => {
  if (!headerRef.value) return 400;
  return headerRef.value.offsetWidth > 400 ? headerRef.value.offsetWidth : 400;
});
</script>

<template>
  <div class="relative overflow-hidden bg-gray-dark">
    <div class="lg:content-container lg:grid lg:grid-cols-2">
      <div class="lg:order-2 lg:border-t lg:border-solid lg:border-zinc-700">
        <NuxtImg
          :src="`/images/products/${productCategory}/${product}/hero.png`"
          class="h-full transform object-cover object-center max-lg:absolute max-lg:left-1/2 max-lg:top-[calc(50%+25px)] max-lg:-translate-x-1/2 max-lg:-translate-y-1/2 lg:h-[600px] lg:object-contain"
          height="600"
        />
      </div>
      <div class="max-lg:content-container relative lg:order-1">
        <div class="border-t border-solid border-zinc-700">
          <div
            class="mx-auto flex flex-col items-center justify-center py-32 lg:items-start"
            :style="{ maxWidth: `${maxWidth}px` }"
          >
            <p
              v-if="productIsNew(selectedProduct.createdAt)"
              class="text-overline mb-6 uppercase text-light opacity-50"
            >
              New Product
            </p>
            <h1 ref="headerRef" class="mb-6 flex flex-col text-light">
              <span>{{ selectedProduct.name }}</span
              ><span>{{ productCategory }}</span>
            </h1>
            <p class="mb-10 text-light opacity-50 max-lg:text-center">{{ description }}</p>
            <Button btn-style="primary" :to="`/product/${productCategory}/${product}`">See Product</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
