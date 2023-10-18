<template>
  <div class="flex min-h-screen flex-col bg-light">
    <Header />
    <main class="flex grow items-center justify-center">
      <div class="content-container my-24 flex h-fit flex-col items-center justify-center">
        <h1 class="mb-0 text-center">{{ error.statusCode }}</h1>
        <h3 class="text-center">{{ error.statusMessage }}</h3>
        <p v-if="error.statusCode === 404" class="mb-10 text-center">
          Sorry, the page you are looking for does not exist.
        </p>
        <p v-else class="mb-10 text-center">An unexpected error occurred please return home and try again</p>
        <Button btn-style="primary" class="w-fit" @click="handleError">Return home</Button>
      </div>
    </main>
    <Footer class="mt-auto" />
  </div>
</template>

<script setup>
defineProps({
  error: {
    type: Object,
    required: true,
  },
});

const route = useRoute();
const handleError = () => clearError({ redirect: "/" });

watch(
  () => route.path,
  () => clearError()
);
</script>
