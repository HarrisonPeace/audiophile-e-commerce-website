<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints, useWindowScroll } from "@vueuse/core";

const { dynamicHeaderHeight } = storeToRefs(useGeneralStore());
const breakpoints = useBreakpoints(breakpointsTailwind);
const isSmallScreenOrSmaller = breakpoints.smallerOrEqual("sm");
const isMediumScreenOrSmaller = breakpoints.smallerOrEqual("md");

defineEmits(["closeModal", "mouseOverModal"]);
const props = defineProps<{
  showModal: boolean;
  position: "center" | "top-right";
}>();

// Prevents hydration issues
const awaitMount = ref(false);
onMounted(() => {
  awaitMount.value = true;
});

const modelIsActive = ref(false);
watch(
  () => props.showModal,
  () => {
    setTimeout(() => {
      modelIsActive.value = props.showModal;
    }, 250);
  }
);

const maxHeight = computed(() => {
  let paddingHeight = 60;
  if (isSmallScreenOrSmaller.value) {
    paddingHeight = 20;
  } else if (isMediumScreenOrSmaller.value || props.position === "top-right") {
    paddingHeight = 30;
  }
  return `calc(100vh - ${dynamicHeaderHeight.value + paddingHeight * 2}px)`;
});
</script>

<template>
  <div v-if="awaitMount">
    <Teleport to="#modals">
      <div class="relative">
        <Transition name="modal">
          <div
            v-if="showModal"
            :style="{ maxHeight }"
            v-click-outside="() => modelIsActive && $emit('closeModal')"
            class="absolute left-1/2 top-6 z-50 w-full max-w-full -translate-x-1/2 overflow-y-auto rounded-md bg-light md:top-9"
            :class="[
              position === 'center' && 'md:top-14 md:w-[540px] md:max-w-xl lg:top-16',
              position === 'top-right' && 'sm:left-auto sm:right-0 sm:w-96 sm:max-w-sm sm:translate-x-0 ',
            ]"
            @mouseover="$emit('mouseOverModal')"
          >
            <slot />
          </div>
        </Transition>
      </div>
    </Teleport>
    <Teleport to="body">
      <Transition name="modal-overlay">
        <div
          v-if="showModal"
          class="fixed left-0 top-0 z-10 h-screen w-screen bg-dark opacity-40"
          @click="$emit('closeModal')"
        />
      </Transition>
    </Teleport>
  </div>
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
