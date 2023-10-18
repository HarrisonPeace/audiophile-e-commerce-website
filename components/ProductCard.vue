<script setup lang="ts">
import { ProductCategories, Products } from "@enums";
import { Product } from "@interfaces";

const { products } = storeToRefs(useProductStore());

type cardStyles = "hero" | "default" | "split";

const props = defineProps<{
  productCategory: ProductCategories;
  product: Products;
  description?: string;
  cardStyle: cardStyles;
}>();

const selectedProduct = computed(() => {
  const product = products.value[props.productCategory][props.product];
  if (typeof product === "string") throw new Error("Product not found");
  return product as Product;
});

const styles: { [key in cardStyles]?: any } = {
  hero: {
    container:
      "bg-primary flex justify-center align-center grid grid-cols-1 lg:grid-cols-2 justify-center align-center",
    imgContainer:
      "flex justify-center align-center max-lg:mt-14 relative lg:translate-y-7 lg:group-hover/card-product:translate-y-3 transition-all duration-500 ease-in-out",
    img: "h-52 lg:h-[490px] relative z-[1]",
    textContainer: "mx-6 mt-8 mb-10 relative flex flex-col justify-center align-center",
    heading: "max-xl:text-center text-heading-4xl text-light flex flex-col justify-center align-center",
    description: "max-xl:text-center max-xl:mx-auto text-light",
    button: "max-xl:mx-auto",
  },
  default: {
    container: "bg-gray-medium flex relative",
    imgContainer: "absolute right-0 top-0 w-full h-full ",
    img: "h-full w-full object-cover rounded-lg",
    textContainer: "relative mx-6 my-28 flex flex-col justify-center align-left lg:mx-16",
    heading: "",
    description: "",
    button: "",
  },
  split: {
    container: "grid grid-cols-1 md:grid-cols-2 relative gap-x-3 lg:gap-x-8 gap-y-12",
    imgContainer: "w-full h-full ",
    img: "h-full w-full object-cover rounded-lg",
    textContainer: "bg-gray-medium px-6 py-28 flex flex-col justify-center align-left lg:px-16",
    heading: "",
    description: "",
    button: "",
  },
};

const imgUrl = computed(() => {
  let img = "";
  switch (props.cardStyle) {
    case "hero":
      img = "display";
      break;
    case "default":
      img = "banner";
      break;
    case "split":
      img = "product-2";
      break;
  }
  return `/images/products/${props.productCategory}/${props.product}/${img}.png`;
});
</script>

<template>
  <div class="content-container group/card-product w-full overflow-hidden">
    <div class="rounded-lg" :class="styles[cardStyle].container">
      <div class="rounded-lg" :class="styles[cardStyle].imgContainer">
        <NuxtImg :src="imgUrl" height="500" :class="styles[cardStyle].img" />
        <div v-if="cardStyle === 'hero'" class="h overflow-hidden">
          <div
            class="absolute left-1/2 top-1/2 h-[279px] w-[279px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-light opacity-25 lg:h-[472px] lg:w-[472px]"
          ></div>
          <div
            class="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-light opacity-25 lg:h-[542px] lg:w-[542px]"
          ></div>
          <div
            class="absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-light opacity-25 lg:h-[944px] lg:w-[944px]"
          ></div>
        </div>
      </div>
      <div
        class="center flex flex-col rounded-lg"
        :class="[styles[cardStyle].textContainer, description ? 'gap-6' : ' gap-8']"
      >
        <h3 class="mb-0" :class="styles[cardStyle].heading">
          <span>{{ selectedProduct.name }}</span>
          {{ productCategory !== "speakers" ? " " : "" }}
          <span>{{ productCategory !== "speakers" ? productCategory : productCategory.slice(0, -1) }}</span>
        </h3>
        <p v-if="description" class="mb-0 max-w-sm" :class="styles[cardStyle].description">{{ description }}</p>
        <Button
          :btn-style="cardStyle === 'hero' ? 'secondaryInverted' : 'secondary'"
          :to="`/product/${productCategory}/${product}`"
          class="w-fit"
          :class="styles[cardStyle].button"
        >
          See Product
        </Button>
      </div>
    </div>
  </div>
</template>
