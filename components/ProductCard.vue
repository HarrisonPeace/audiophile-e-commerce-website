<script setup lang="ts">
import { Product } from "@interfaces";

type cardStyles = "hero" | "default" | "split" | "display" | "displayGrid";

const props = defineProps<{
  product: Product;
  description?: string;
  cardStyle: cardStyles;
  imgRight?: boolean;
}>();

const styles: { [key in cardStyles]?: any } = {
  hero: {
    container:
      "bg-primary flex justify-center align-center grid grid-cols-1 lg:grid-cols-2 justify-center align-center",
    imgContainer:
      "flex justify-center align-center max-lg:mt-14 relative lg:translate-y-7 lg:group-hover/card-product:translate-y-3 transition-all duration-500 ease-in-out",
    img: "h-52 lg:h-[490px] relative z-[1]",
    textContainer: "mx-6 mt-8 mb-10 relative flex flex-col justify-center align-center",
    heading: "max-xl:text-center text-heading-4xl text-light flex flex-col justify-center align-center",
    description: "max-xl:text-center max-xl:mx-auto text-light max-w-sm",
    button: "max-xl:mx-auto",
  },
  default: {
    container: "bg-gray-medium flex relative",
    imgContainer: "absolute right-0 top-0 w-full h-full ",
    img: "h-full w-full object-cover rounded-lg",
    textContainer: "relative mx-6 my-28 flex flex-col justify-center align-left lg:mx-16",
    heading: "",
    description: "max-w-sm",
    button: "",
  },
  split: {
    container: "grid grid-cols-1 md:grid-cols-2 relative gap-x-3 lg:gap-x-8 gap-y-12",
    imgContainer: "w-full h-full ",
    img: "h-full w-full object-cover rounded-lg",
    textContainer: "bg-gray-medium px-6 py-28 flex flex-col justify-center align-left lg:px-16",
    heading: "",
    description: "max-w-sm",
    button: "",
  },
  display: {
    container: "grid grid-cols-1 lg:grid-cols-2 relative gap-y-8 md:gap-y-12 gap-x-28",
    imgContainer: `w-full h-full bg-gray-medium flex justify-center items-center p-12 lg:p-20 ${
      props.imgRight ? "lg:order-2" : ""
    }`,
    img: "h-60 lg:h-96 w-auto object-contain",
    textContainer: `flex flex-col justify-center items-center lg:align-left ${props.imgRight ? "lg:order-1" : ""}`,
    heading: "max-lg:text-center",
    description: "max-lg:text-center max-w-2xl opacity-60",
    button: "max-lg:text-center",
  },
  displayGrid: {
    container: "flex flex-col relative gap-y-8 md:gap-y-12",
    imgContainer: "w-full  bg-gray-medium flex justify-center items-center p-3 md:p-14",
    img: "h-24 md:h-48 w-auto object-contain",
    textContainer: "flex flex-col justify-between items-center grow",
    heading: "text-center text-heading-base",
    description: "text-center max-w-2xl opacity-60",
    button: "text-center",
  },
};

const imgUrl = computed(() => {
  let img = "";
  switch (props.cardStyle) {
    case "default":
      img = "banner";
      break;
    case "split":
      img = "product-2";
      break;
    default:
      img = "display";
      break;
  }

  return `/images/products/${props.product.key}/${img}.png`;
});

const btnStyle = computed(() => {
  switch (props.cardStyle) {
    case "hero":
      return "secondaryInverted";
    case "display":
      return "primary";
    case "displayGrid":
      return "primary";
    default:
      return "secondary";
  }
});
</script>

<template>
  <div v-if="product" class="group/card-product content-container flex w-full overflow-hidden">
    <div class="grow rounded-lg" :class="styles[cardStyle].container">
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
          <span>{{ product.name }}</span>
          {{ product.category !== "speakers" ? " " : "" }}
          <span>{{ product.category !== "speakers" ? product.category : product.category.slice(0, -1) }}</span>
        </h3>
        <p v-if="description || cardStyle === 'display'" class="mb-0" :class="styles[cardStyle].description">
          {{ description ?? product.description }}
        </p>
        <Button
          :btn-style="btnStyle"
          :to="`/products/${product.category}/${product.key}`"
          class="w-fit"
          :class="styles[cardStyle].button"
        >
          See Product
        </Button>
      </div>
    </div>
  </div>
</template>
