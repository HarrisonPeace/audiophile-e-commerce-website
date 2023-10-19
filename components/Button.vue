<script setup lang="ts">
defineEmits(["click"]);
const props = defineProps<{
  to?: string;
  target?: string;
  btnStyle: "primary" | "secondary" | "secondaryInverted";
}>();

const componentType = computed(() => {
  if (props.to) return resolveComponent("NuxtLink");
  return "button";
});

const styles = {
  primary: "border-primary bg-primary text-light hover:bg-primary-light hover:border-primary-light",
  secondary: "border-dark bg-transparent text-dark hover:bg-dark hover:text-light",
  secondaryInverted: "border-dark bg-dark text-light hover:bg-transparent hover:text-dark",
};

const componentProps = computed(() => ({
  ...(props.to && { to: props.to }),
  ...(props.target && { target: props.target }),
  class: `h-12 w-fit text-button flex justify-center items-center border border-solid px-8 py-4 transition-colors ease-in-out ${
    styles[props.btnStyle]
  }`,
}));
</script>

<template>
  <component :is="componentType" v-bind="componentProps" @click="$emit('click')"><slot /></component>
</template>
