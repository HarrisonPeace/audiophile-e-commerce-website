<script setup lang="ts">
const productStore = useProductStore();
const route = useRoute();

const category = route.params.category;

const categories = productStore.findCategories();

if (typeof category !== "string" || !categories.includes(category)) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

const categoryProducts = computed(() => productStore.findProductsFromCategory(category));
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
