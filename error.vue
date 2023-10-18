<template>
  <div class="flex min-h-screen flex-col bg-light">
    <Header />
    <main>
      <div class="content-container my-24 flex items-center justify-center">
        <div>
          <h1>{{ error.statusCode }}</h1>
          <h3>{{ error.statusMessage }}</h3>
          <p v-if="error.statusCode === 404" class="mb-10">Sorry, the page you are looking for does not exist.</p>
          <p v-else class="mb-10">An unexpected error occurred please return home and try again</p>
          <Button btn-style="primary" @click="handleError">Return home</Button>
        </div>
      </div>
    </main>
    <McnFooter class="mt-auto" />
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
