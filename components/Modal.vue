<script setup lang="ts">
defineEmits(["closeModal"]);
defineProps<{
  showModal: boolean;
  position: "center" | "top-right";
}>();
</script>

<template>
  <Teleport to="#modals">
    <div class="relative">
      <Transition name="modal">
        <div
          v-if="showModal"
          class="absolute left-1/2 top-0 z-50 m-6 -translate-x-1/2 overflow-y-auto rounded-md bg-light px-7 py-8"
          :class="[
            position === 'center' && 'p-12 md:top-14',
            position === 'top-right' && 'md:right-9 md:top-0 md:translate-x-0 md:translate-y-0 md:p-8 lg:top-2',
          ]"
        >
          <slot />
        </div>
      </Transition>
    </div>
    <Transition name="modal-overlay">
      <div
        v-if="showModal"
        class="fixed left-0 top-0 z-10 h-screen w-screen bg-dark opacity-40"
        @click="$emit('closeModal')"
      ></div>
    </Transition>
  </Teleport>
</template>

<style lang="scss">
.modal-button-enter-active,
.modal-button-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.modal-button-leave-active {
  position: absolute;
  top: 0;
  left: 0;
}

.modal-button-enter-from,
.modal-button-leave-to {
  opacity: 0;
  transform: rotate(180deg);
  transform-origin: center;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
  overflow: hidden;
  & > * {
    transition: transform 0.25s ease;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  & > * {
    transform: translateY(1rem);
  }
}

.modal-overlay-enter-active,
.modal-overlay-leave-active {
  transition: opacity 0.25s ease;
}

.modal-overlay-enter-from,
.modal-overlay-leave-to {
  opacity: 0;
}
</style>
