<script setup lang="ts">
const { dynamicHeaderHeight } = storeToRefs(useGeneralStore());
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <Header />
    <div
      id="modals"
      class="content-container fixed left-0 z-50 w-screen transition-all"
      :style="{ top: `${dynamicHeaderHeight}px` }"
    />
    <main class="grow bg-gray-medium">
      <NuxtLoadingIndicator color="#D87D4A" />
      <slot />
    </main>
    <Footer class="mt-auto" />
    <Cart />
  </div>
</template>
