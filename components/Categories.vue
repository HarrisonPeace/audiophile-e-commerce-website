<script setup lang="ts">
const productStore = useProductStore();
const route = useRoute();

const categories = productStore.findCategories();
const heroProducts = productStore.findProducts("isHero", true);

const modifiedPath = computed(() => route.path.replace("products", "").replaceAll("/", ""));
const highlightCategories = ref(categories.find(category => modifiedPath.value.includes(category)) ?? "");
</script>

<template>
  <div class="content-container grid w-full grid-cols-1 gap-x-3 gap-y-8 sm:grid-cols-3 lg:gap-x-8">
    <NuxtLink
      v-for="category in categories"
      :key="category"
      :class="[modifiedPath === category && 'pointer-events-none']"
      class="group/nav-item categoryCard relative w-full"
      :to="`/products/${category}`"
    >
      <NuxtImg
        :src="`/products/${heroProducts.find(product => product.category === category)?.key ?? ''}/display.png`"
        class="drop relative mx-auto -mb-14 h-[104px] drop-shadow-product transition-transform duration-300 ease-in-out group-hover/nav-item:-translate-y-1"
        height="104"
      />
      <div class="flex flex-col items-center justify-center rounded-lg bg-gray-medium pb-6 pt-20">
        <span class="mb-4 font-bold uppercase">{{ category }}</span>
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
      <div
        v-if="highlightCategories?.includes?.(category)"
        class="absolute bottom-0 left-1/2 h-[3px] w-24 -translate-x-1/2 bg-primary"
      />
    </NuxtLink>
  </div>
</template>
