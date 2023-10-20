<script setup lang="ts">
const cartStore = useCartStore();
</script>

<template>
  <div class="flex min-h-screen flex-col bg-white">
    <Header />
    <div id="modals" class="content-container w-screen"></div>
    <main class="grow bg-light">
      <NuxtLoadingIndicator color="#D87D4A" />
      <slot />

      <div class="content-container mb-24 grid grid-cols-1 items-center gap-x-8 gap-y-12 md:mb-48 lg:grid-cols-2">
        <NuxtImg
          src="/images/audio.png"
          class="h-[300px] w-full rounded-lg object-cover lg:order-2 lg:h-[588px]"
          height="600"
        />
        <div class="max-lg:mx-auto max-lg:px-14 lg:order-1 lg:max-w-md">
          <h2 class="max-lg:text-center">Bringing you the <span class="text-primary">best</span> audio gear</h2>
          <p class="mb-0 max-lg:text-center">
            Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones,
            speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you
            to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic
            people who make Audiophile the best place to buy your portable audio equipment.
          </p>
        </div>
      </div>
    </main>
    <Footer class="mt-auto" />
    <Modal
      :show-modal="cartStore.showCartModal"
      position="top-right"
      @close-modal="cartStore.closeCartModal"
      @mouse-over-modal="cartStore.clearCartTimeout"
    >
      >
      <div>sdfsdf</div></Modal
    >
  </div>
</template>

<style lang="scss">
// TODO: update transition
/*** Default Page Transition ***/
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(2rem);
}
</style>
