<script setup lang="ts">
import { ProductsEnum } from "@enums";
</script>

<template>
  <div>
    <Banner
      :product="ProductsEnum.xx99MarkTwo"
      description="Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast."
      class="mb-10 md:mb-24 lg:mb-48"
    />

    <Categories class="mb-32 md:mb-24 lg:mb-40" />

    <div class="mb-24 flex flex-col gap-12 md:mb-48">
      <ProductCard
        :product="ProductsEnum.zx9"
        description="Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound."
        card-style="hero"
      />
      <ProductCard :product="ProductsEnum.zx7" card-style="default" />
      <ProductCard :product="ProductsEnum.yx1Wireless" card-style="split" />
    </div>
  </div>
</template>
