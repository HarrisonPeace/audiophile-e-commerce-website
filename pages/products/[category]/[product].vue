<script setup lang="ts">
import { Product } from "@interfaces";
import { CategoriesEnum, ProductsEnum } from "@enums";

const { productIsNew, convertPrice } = useHelpers();
const { products } = storeToRefs(useProductStore());
const route = useRoute();

const category = route.params.category as CategoriesEnum;
const product = route.params.product as ProductsEnum;

if (CategoriesEnum[category] === undefined || ProductsEnum[product] === undefined) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

const selectedProduct = computed<Product>(() => products.value[category][product]);
const suggestedProducts = computed(() => {
  const suggestedProductKeys: { category: keyof typeof CategoriesEnum; product: keyof typeof ProductsEnum }[] = [];

  const returnRandomKey = (o: any): any => {
    const keys = Object.keys(o);
    return keys[Math.floor(Math.random() * keys.length)];
  };

  while (suggestedProductKeys.length < 3) {
    const randomCategoryKey = returnRandomKey(products.value) as keyof typeof CategoriesEnum;
    const randomProductKey = returnRandomKey(products.value[randomCategoryKey]) as keyof typeof ProductsEnum;
    if (!suggestedProductKeys.some(keys => keys.product === randomProductKey) && product !== randomProductKey)
      suggestedProductKeys.push({ category: randomCategoryKey, product: randomProductKey });
  }

  return suggestedProductKeys;
});
</script>

<template>
  <div>
    <div class="content-container mb-6 mt-8 md:mb-14 md:mt-20">
      <button class="flex gap-3" @click="$router.back()">
        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg" class="rotate-180">
          <path d="M1.32227 1L6.32227 6L1.32227 11" stroke="#D87D4A" stroke-width="2" />
        </svg>
        <span
          class="text-button text-dark opacity-60 transition-all group-hover/nav-item:text-primary group-hover/nav-item:opacity-100"
        >
          Back
        </span>
      </button>
    </div>

    <div
      class="content-container mb-20 grid grid-cols-1 gap-x-16 gap-y-10 md:mb-28 md:grid-cols-2 lg:mb-40 lg:gap-x-32"
    >
      <div class="flex h-full w-full items-center justify-center bg-gray-medium px-4 py-14">
        <NuxtImg :src="`/images/products/${category}/${product}/display.png`" height="500" class="h-52 lg:h-80" />
      </div>
      <div>
        <p v-if="productIsNew(selectedProduct.createdAt)" class="text-overline mb-6">New Product</p>
        <h1 ref="headerRef" class="text-heading-2xl mb-6 flex flex-col md:mb-8">
          <span>{{ selectedProduct.name }}</span>
          <span>{{ productCategory }}</span>
        </h1>
        <p class="mb-6 opacity-60 md:mb-8">{{ selectedProduct.description }}</p>
        <p class="text-heading-base mb-8 lg:mb-12">$ {{ convertPrice(selectedProduct.price) }}</p>
      </div>
      <form>
        <QntInput />
        <Button btn-style="secondary" :to="`/products/${category}/${product}`">Add to Cart</Button>
      </form>
    </div>

    <div
      class="content-container mb-20 grid grid-cols-1 gap-x-28 gap-y-20 md:mb-28 md:gap-y-32 lg:mb-40 lg:grid-cols-2"
    >
      <div>
        <h3 class="mb-6 md:mb-8">Features</h3>
        <p v-for="(p, idx) in selectedProduct.features" :key="idx" class="opacity-60">{{ p }}</p>
      </div>
      <div class="md:grid md:grid-cols-2 md:gap-x-8 lg:block">
        <h3 class="mb-6 md:mb-8">In the box</h3>
        <div>
          <p v-for="item in selectedProduct.inTheBox" :key="item.item.replace(' ', '-')" class="flex gap-6">
            <span class="font-bold text-primary">{{ item.qnt }}x</span> <span class="opacity-60">{{ item.item }}</span>
          </p>
        </div>
      </div>
    </div>

    <div
      class="content-container mb-20 grid grid-cols-1 gap-5 md:mb-28 md:grid-cols-2 md:grid-rows-2 lg:mb-40 lg:gap-8"
    >
      <NuxtImg
        :src="`/images/products/${category}/${product}/product-1.png`"
        height="300"
        class="h-44 min-h-full w-full rounded-md object-cover object-center md:col-span-1 md:col-start-1 md:row-span-1 md:row-start-1 lg:h-72"
      />
      <NuxtImg
        :src="`/images/products/${category}/${product}/product-2.png`"
        height="300"
        class="h-44 min-h-full w-full rounded-md object-cover object-center md:col-span-1 md:col-start-1 md:row-span-1 md:row-start-2 lg:h-72"
      />
      <NuxtImg
        :src="`/images/products/${category}/${product}/product-3.png`"
        height="600"
        class="h-96 w-full rounded-md object-cover object-center md:col-span-1 md:col-start-2 md:row-span-2 md:row-start-1 md:h-full"
      />
    </div>

    <div>
      <div class="content-container">
        <h3 class="mb-10 text-center md:mb-14 lg:mb-16">You may also like</h3>
      </div>
      <div class="mb-28 grid grid-cols-1 gap-28 gap-x-3 gap-y-8 sm:grid-cols-3 md:grid-cols-3 lg:mb-40 lg:gap-x-8">
        <ProductCard
          v-for="keys in suggestedProducts"
          :key="keys.product"
          :product-category="CategoriesEnum[keys.category]"
          :product="ProductsEnum[keys.product]"
          card-style="displayGrid"
        />
      </div>
    </div>

    <Categories class="mb-28" />
  </div>
</template>
