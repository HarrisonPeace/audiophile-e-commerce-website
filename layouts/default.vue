<template>
  <div class="flex min-h-screen flex-col bg-white">
    <Header />
    <main>
      <NuxtLoadingIndicator color="#00A7F2" />
      <slot />
    </main>
    <Footer />
  </div>
</template>
