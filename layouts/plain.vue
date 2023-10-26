<script setup lang="ts">
const { headerHeight, reduceHeaderPadding, headerPaddingReductionAmount } = storeToRefs(useGeneralStore());
// modalContainerTop correlates with headerPadding and they must be updated together
const modalContainerTop = computed(
  () => headerHeight.value - (reduceHeaderPadding.value ? headerPaddingReductionAmount.value : 0)
);
</script>

<template>
  <div class="flex min-h-screen flex-col bg-gray-medium">
    <Header />
    <div
      id="modals"
      class="content-container fixed left-0 z-50 w-screen transition-all"
      :style="{ top: `${modalContainerTop}px` }"
    ></div>
    <main class="grow bg-light">
      <NuxtLoadingIndicator color="#D87D4A" />
      <slot />
    </main>
    <Footer class="mt-auto" />
    <Cart />
  </div>
</template>
