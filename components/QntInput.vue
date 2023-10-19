<script setup>
defineEmits(['update:modelValue']);

const props = defineProps<{
  modelValue?: number;
} > ();

const updateValue = (value: number) => {
  if (value < 0) return;
  $emit('update:modelValue', value);
};

const increaseValue = () => {
  updateValue(props.modelValue > 0 ? props.modelValue + 1 : 1);
};

const decreaseValue = () => {
  updateValue(props.modelValue > 1 ? props.modelValue - 1 : 0);
};
</script>

<template>
  <div class="bg-gray-medium">
    <button title="increase" class="hover-light p-4" type="button" @click="increaseValue">
      <svg width="5" height="2" viewBox="0 0 5 2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.25" d="M0.550508 1.516V0.2875H4.45051V1.516H0.550508Z" fill="currentColor" />
      </svg>
    </button>
    <span>{{ value }}</span>
    <button title="increase" class="hover-light p-4" type="button" @click="decreaseValue">
      <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2.89362 6.258V3.931H0.566621V2.7025H2.89362V0.382H4.12212V2.7025H6.43612V3.931H4.12212V6.258H2.89362Z"
          fill="currentColor"
        />
      </svg>
    </button>
  </div>
</template>
