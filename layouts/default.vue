<template>
  <div class="flex min-h-screen flex-col bg-white">
    <Header />
    <main class="bg-light">
      <NuxtLoadingIndicator color="#00A7F2" />
      <slot />
    </main>
    <Footer class="mt-auto" />
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
