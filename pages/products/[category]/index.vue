<script setup lang="ts">
import { CategoriesEnum, ProductsEnum } from "@enums";

const { products } = storeToRefs(useProductStore());
const route = useRoute();
const category = route.params.category as CategoriesEnum;

if (CategoriesEnum[category] === undefined) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

const categoryProducts = computed(() => Object.keys(products.value[category]) as (keyof typeof ProductsEnum)[]);
</script>

<template>
  <div>
    <BannerBasic class="mb-16 md:mb-28 lg:mb-40">{{ category }}</BannerBasic>

    <div class="mb-28 flex flex-col gap-28 lg:mb-40 lg:gap-40">
      <ProductCard
        v-for="(productKey, idx) in categoryProducts"
        :key="productKey"
        :product-category="category"
        :product="ProductsEnum[productKey]"
        card-style="display"
        :img-right="idx % 2 !== 0"
      />
    </div>
    <Categories class="mb-28" />
  </div>
</template>
