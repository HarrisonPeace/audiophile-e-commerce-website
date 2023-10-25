<script setup lang="ts">
defineEmits(["closeModal", "mouseOverModal"]);
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
          class="absolute left-1/2 top-6 z-50 w-full max-w-full -translate-x-1/2 overflow-y-auto rounded-md bg-light md:top-9"
          :class="[
            position === 'center' && 'md:top-14 md:w-[540px] md:max-w-lg lg:top-16',
            position === 'top-right' && 'sm:left-auto sm:right-0 sm:w-96 sm:max-w-sm sm:translate-x-0 ',
          ]"
          @mouseover="$emit('mouseOverModal')"
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
