<script setup lang="ts">
const { products } = storeToRefs(useProductStore());
</script>

<template>
  <div class="content-container grid w-full grid-cols-1 gap-8 gap-x-3 sm:grid-cols-3">
    <NuxtLink v-for="(value, key) in products" :key="key" class="group/nav-item categoryCard w-full" :to="`/${key}`">
      <NuxtImg
        :src="`/images/products/${key}/${value.heroProduct}/display.png`"
        class="drop relative mx-auto -mb-14 drop-shadow-product transition-transform duration-300 ease-in-out group-hover/nav-item:-translate-y-1"
        height="104"
      />
      <div class="flex flex-col items-center justify-center rounded-lg bg-gray-medium pb-6 pt-20">
        <span class="mb-4 font-bold uppercase">{{ key }}</span>
        <div class="flex gap-3">
          <span
            class="text-button text-dark opacity-60 transition-all group-hover/nav-item:text-primary group-hover/nav-item:opacity-100"
          >
            Shop
          </span>
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.32227 1L6.32227 6L1.32227 11" stroke="#D87D4A" stroke-width="2" />
          </svg>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
