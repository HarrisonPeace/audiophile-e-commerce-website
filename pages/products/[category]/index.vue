<script setup lang="ts">
import { Product } from "@interfaces";
const productStore = useProductStore();
const route = useRoute();

const category = route.params.category as keyof Product;

const categoryProducts = productStore.findProductsFromCategory(category);

if (!Object.keys(categoryProducts.value).length) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}
</script>

<template>
  <div>
    <BannerBasic class="mb-16 md:mb-28 lg:mb-40">{{ category }}</BannerBasic>

    <div class="mb-28 flex flex-col gap-28 lg:mb-40 lg:gap-40">
      <ProductCard
        v-for="(product, idx) in categoryProducts"
        :key="product.key"
        :products="categoryProducts"
        card-style="display"
        :img-right="+idx % 2 !== 0"
      />
    </div>
    <Categories class="mb-28" />
  </div>
</template>
