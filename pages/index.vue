<script setup lang="ts">
const productStore = useProductStore();

const zx9 = productStore.findProduct("zx9");
const zx7 = productStore.findProduct("zx7");
const yx1Wireless = productStore.findProduct("yx1Wireless");
const xx99MarkTwo = productStore.findProduct("xx99MarkTwo");
</script>

<template>
  <div>
    <Banner
      :product="xx99MarkTwo"
      description="Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast."
      class="mb-10 md:mb-24 lg:mb-48"
    />

    <Categories class="mb-32 md:mb-24 lg:mb-40" />

    <div class="mb-24 flex flex-col gap-12 md:mb-48">
      <ProductCard
        :product="zx9"
        description="Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound."
        card-style="hero"
      />
      <ProductCard :product="zx7" card-style="default" />
      <ProductCard :product="yx1Wireless" card-style="split" />
    </div>
  </div>
</template>
