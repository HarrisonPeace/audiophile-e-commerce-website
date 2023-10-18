<script setup lang="ts">
import { Product, Category } from "@interfaces";
import { CategoriesEnum, ProductsEnum } from "@enums";

const { products } = storeToRefs(useProductStore());
const route = useRoute();
const category = route.params.category as CategoriesEnum;
const product = route.params.product as ProductsEnum;

console.log(route.params);

if (CategoriesEnum[category] === undefined || ProductsEnum[product] === undefined) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

const selectedProduct = computed<Product>(() => products.value[category][product]);
const suggestedProducts = computed(() => {
  const suggestedProductKeys: { category: keyof typeof CategoriesEnum; product: keyof typeof ProductsEnum }[] = [];

  const returnRandomKey = (o: any): any => {
    const keys = Object.keys(o);
    return keys[Math.floor(Math.random() * keys.length)];
  };

  while (suggestedProductKeys.length < 3) {
    const randomCategoryKey = returnRandomKey(products.value) as keyof typeof CategoriesEnum;
    const randomProductKey = returnRandomKey(products.value[randomCategoryKey]) as keyof typeof ProductsEnum;
    if (!suggestedProductKeys.some(keys => keys.product === randomProductKey) && product !== randomProductKey)
      suggestedProductKeys.push({ category: randomCategoryKey, product: randomProductKey });
  }

  return suggestedProductKeys;
});
</script>

<template>
  <div>
    <h3 class="mb-10 text-center md:mb-14 lg:mb-16">You may also like</h3>
    <div
      class="content-container mb-28 grid grid-cols-1 gap-28 gap-x-3 gap-y-8 sm:grid-cols-3 md:grid-cols-3 lg:mb-40 lg:gap-x-8"
    >
      <ProductCard
        v-for="keys in suggestedProducts"
        :key="keys.product"
        :product-category="CategoriesEnum[keys.category]"
        :product="ProductsEnum[keys.product]"
        card-style="displayGrid"
      />
    </div>
    <Categories class="mb-28" />
  </div>
</template>
