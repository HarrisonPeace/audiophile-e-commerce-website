<script setup lang="ts">
import { ProductCategories, Products } from "@enums";

const { products } = storeToRefs(useProductStore());
const route = useRoute();
const category = route.params.category as ProductCategories;
const categoryProducts = computed(() => Object.keys(products.value[category])) as unknown as (keyof typeof Products)[];

if (ProductCategories[category] === undefined) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}
</script>

<template>
  <div>
    <BannerBasic class="mb-16 md:mb-28 lg:mb-40">{{ category }}</BannerBasic>

    <div class="mb-28 flex flex-col gap-28 lg:mb-40 lg:gap-40">
      <ProductCard
        v-for="productKey in categoryProducts"
        :key="productKey"
        :product-category="category"
        :product="Products[productKey]"
        card-style="display"
      />
    </div>
    <Categories class="mb-28" />
  </div>
</template>
