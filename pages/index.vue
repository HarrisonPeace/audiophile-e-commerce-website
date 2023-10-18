<script setup lang="ts">
import { ProductCategories, Products } from "@enums";
</script>

<template>
  <div class="mb-24 flex flex-col gap-24">
    <Banner
      :product-category="ProductCategories.headphones"
      :product="Products.xx99MarkTwo"
      description="Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast."
    />
    <CategoryLinks />
  </div>
</template>
