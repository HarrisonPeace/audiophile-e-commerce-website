<script setup lang="ts">
import { type FormKitContext } from "@interfaces";

const props = defineProps<{
  context: FormKitContext<number>;
}>();

const min = ref(props.context.attrs.min ?? 0);
const max = ref(props.context.attrs.max ?? null);

const updateValue = (value: number) => {
  if (value < min.value || (max.value && value > max.value)) return;
  props.context.node.input(value);
};

const increaseValue = () => {
  updateValue(props.context._value > 0 ? props.context._value + 1 : 1);
};

const decreaseValue = () => {
  updateValue(props.context._value > 1 ? props.context._value - 1 : 0);
};
</script>

<template>
  <div class="flex h-12 w-fit items-center justify-center bg-gray-medium">
    <button
      title="Decrease quantity"
      class="hover-dark h-full px-4 opacity-50 transition-all hover:opacity-100"
      :class="props.context._value <= min ? 'pointer-events-none' : ''"
      type="button"
      :disabled="props.context._value <= min"
      @click="decreaseValue"
    >
      <svg width="10" height="4" viewBox="0 0 5 2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.550508 1.516V0.2875H4.45051V1.516H0.550508Z" fill="currentColor" />
      </svg>
    </button>
    <span class="flex min-w-[50px] items-center justify-center px-4">{{ context._value }}</span>
    <button
      title="Increase quantity"
      class="hover-dark h-full px-4 opacity-50 transition-all hover:opacity-100"
      :class="max && props.context._value >= max ? 'pointer-events-none' : ''"
      type="button"
      :disabled="max && props.context._value >= max"
      @click="increaseValue"
    >
      <svg width="10" height="10" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2.89362 6.258V3.931H0.566621V2.7025H2.89362V0.382H4.12212V2.7025H6.43612V3.931H4.12212V6.258H2.89362Z"
          fill="currentColor"
        />
      </svg>
    </button>
  </div>
</template>
