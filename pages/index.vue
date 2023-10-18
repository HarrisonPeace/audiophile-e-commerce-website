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

    <Categories />

    <div class="flex flex-col gap-12">
      <ProductCard
        :product-category="ProductCategories.speakers"
        :product="Products.zx9"
        description="Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound."
        card-style="hero"
      />
      <ProductCard :product-category="ProductCategories.speakers" :product="Products.zx7" card-style="default" />
      <ProductCard :product-category="ProductCategories.earphones" :product="Products.yx1Wireless" card-style="split" />
    </div>
  </div>
</template>
