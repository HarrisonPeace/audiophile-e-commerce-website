<script setup lang="ts">
const cartStore = useCartStore();

const props = defineProps<{
  title: string;
  onlyAllowEdit?: boolean;
}>();

const allowEdit = ref(props.onlyAllowEdit ?? false);

const showConfirmRemoveAll = ref(false);

const toggleRemoveAll = () => {
  showConfirmRemoveAll.value = !showConfirmRemoveAll.value;
};

const removeAllEditCart = () => {
  if (allowEdit.value) {
    toggleRemoveAll();
    return;
  }
  allowEdit.value = true;
};
</script>

<template>
  <div class="relative">
    <div class="flex items-center justify-around">
      <h6>{{ title }}</h6>
      <button @click="removeAllEditCart">{{ allowEdit ? "Remove all" : "Edit cart" }}</button>
    </div>

    <div>
      <div v-for="(value, key) in cartStore.cart" :key="key">
        <div>
          <NuxtImg :src="`/images/products/${key.category}/${key.product}/hero.png`" />
        </div>
      </div>
    </div>

    <div class="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-6 bg-dark opacity-40">
      <Button btn-style="primary" @click="cartStore.clearCart">Confirm</Button>
      <Button btn-style="secondary" @click="toggleRemoveAll">Cancel</Button>
    </div>
  </div>
</template>
