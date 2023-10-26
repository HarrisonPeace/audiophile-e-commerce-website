<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints, useWindowScroll } from "@vueuse/core";

const route = useRoute();
const cartStore = useCartStore();
const productStore = useProductStore();
const { headerHeight, reduceHeaderPadding } = storeToRefs(useGeneralStore());
const showMobileMenu = ref(false);

const categories = productStore.findCategories();

const toggleMobileMenu = () => {
  document.body.classList.toggle("overflow-y-hidden");
  showMobileMenu.value = !showMobileMenu.value;
};

const closeMobileMenu = () => {
  document.body.classList.remove("overflow-y-hidden");
  showMobileMenu.value = false;
};

const breakpoints = useBreakpoints(breakpointsTailwind);
const isLargeScreenOrSmaller = breakpoints.smallerOrEqual("lg");
watch([() => isLargeScreenOrSmaller.value, () => route.path], closeMobileMenu);

const lastScrollTop = ref(0);
const navRefs = ref<HTMLElement[]>([]);
const headerRef = ref<HTMLElement | null>(null);
const reduceHeaderPaddingTimeout = ref(false);

const { y } = useWindowScroll();
watch(
  () => y.value,
  () => {
    if (!headerRef.value || !navRefs.value || showMobileMenu.value) return;

    const updateReduceHeaderPadding = (bool: boolean) => {
      if (reduceHeaderPadding.value !== bool && !reduceHeaderPaddingTimeout.value) {
        reduceHeaderPadding.value = bool;
        reduceHeaderPaddingTimeout.value = true;
        setTimeout(() => {
          reduceHeaderPaddingTimeout.value = false;
        }, 150);
      }
    };

    if (y.value < lastScrollTop.value || y.value <= headerRef.value.offsetHeight) {
      updateReduceHeaderPadding(false);
    } else if (!reduceHeaderPadding.value && !reduceHeaderPaddingTimeout.value) {
      updateReduceHeaderPadding(true);
    }

    lastScrollTop.value = y.value <= 0 ? 0 : y.value;
  }
);

watch(
  () => headerRef.value,
  () => {
    headerHeight.value = headerRef?.value?.offsetHeight ?? 0;
  }
);

// headerPadding correlates with modalContainerTop and they must be updated together
const headerPadding = computed(() => (reduceHeaderPadding.value ? "py-4" : "py-8"));

const modifiedPath = computed(() => route.path.replace("products", "").replaceAll("/", ""));
</script>

<template>
  <header ref="headerRef" class="sticky top-0 z-30 max-h-screen bg-gray-dark">
    <div class="relative">
      <div class="content-container relative" :class="[showMobileMenu && 'fixed left-0 top-0']">
        <div class="flex items-center justify-between gap-11">
          <button
            ref="navRefs"
            class="hover-light transition-all ease-in-out lg:hidden"
            :class="headerPadding"
            :title="showMobileMenu ? 'Close Menu' : 'Open Menu'"
            @click="toggleMobileMenu"
          >
            <div class="relative">
              <TransitionGroup name="mobile-menu-button">
                <svg
                  v-show="!showMobileMenu"
                  key="menu"
                  width="16"
                  height="15"
                  viewBox="0 0 16 15"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="16" height="3" />
                  <rect y="6" width="16" height="3" />
                  <rect y="12" width="16" height="3" />
                </svg>
                <svg
                  v-show="showMobileMenu"
                  key="close"
                  width="16"
                  height="15"
                  viewBox="0 0 16 15"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 15L2.88745e-07 13.125L6 7.5L2.88745e-07 1.875L2 0L8 5.625L14 0L16 1.875L10 7.5L16 13.125L14 15L8 9.375L2 15Z"
                  />
                </svg>
              </TransitionGroup>
            </div>
          </button>

          <NuxtLink ref="navRefs" to="/" class="transition-all ease-in-out" :class="headerPadding" title="Home">
            <NuxtImg src="/logo.svg" width="143" height="25" />
          </NuxtLink>
          <nav ref="navRefs" class="hidden gap-8 lg:flex">
            <NuxtLink
              v-for="category in categories"
              :key="category"
              class="hover-light border-b-4 border-t-4 border-solid border-gray-dark font-bold uppercase transition-all ease-in-out"
              :class="[
                reduceHeaderPadding ? 'py-3' : 'py-7',
                modifiedPath.includes(category) && ' border-b-4 border-b-primary',
                modifiedPath === category && ' border-b-4 border-b-primary',
              ]"
              :to="`/products/${category}`"
              >{{ category }}</NuxtLink
            >
          </nav>
          <button
            ref="navRefs"
            class="hover-light transition-all ease-in-out"
            :class="[headerPadding, route.path.includes('/checkout') && 'pointer-events-none opacity-0']"
            title="Open Cart"
            @click="cartStore.toggleCartModal"
          >
            <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.01883 13.1946H8.01776C7.64161 13.1955 7.33595 13.491 7.33595 13.8542C7.33595 14.2179 7.64268 14.5139 8.01954 14.5139H20.4154C20.793 14.5139 21.099 14.8092 21.099 15.1736C21.099 15.538 20.793 15.8333 20.4154 15.8333H19.25H9.25H8.01954C6.88876 15.8333 5.96876 14.9455 5.96876 13.8542C5.96876 13.0421 6.47843 12.343 7.20493 12.0382L4.73686 1.31944H1.18359C0.806016 1.31944 0.5 1.02412 0.5 0.659722C0.5 0.295329 0.806016 0 1.18359 0H5.28516C5.6056 0 5.88295 0.214753 5.95256 0.516611L6.44122 2.63889H23.1498C23.3643 2.63889 23.5663 2.73613 23.6956 2.9014C23.8246 3.06668 23.8659 3.28074 23.807 3.47986L21.0726 12.716C20.9888 12.9991 20.7205 13.1944 20.4154 13.1944H8.0215L8.01883 13.1946ZM9.25 15.8333C10.3987 15.8333 11.3333 16.7679 11.3333 17.9167C11.3333 19.0654 10.3987 20 9.25 20C8.10127 20 7.16667 19.0654 7.16667 17.9167C7.16667 16.7679 8.10127 15.8333 9.25 15.8333ZM19.25 15.8333C20.3987 15.8333 21.3333 16.7679 21.3333 17.9167C21.3333 19.0654 20.3987 20 19.25 20C18.1013 20 17.1667 19.0654 17.1667 17.9167C17.1667 16.7679 18.1013 15.8333 19.25 15.8333ZM19.8997 11.875L22.2435 3.95833H6.74492L8.56784 11.875H19.8997ZM9.94444 17.9167C9.94444 17.5338 9.63285 17.2222 9.25 17.2222C8.86715 17.2222 8.55556 17.5338 8.55556 17.9167C8.55556 18.2995 8.86715 18.6111 9.25 18.6111C9.63285 18.6111 9.94444 18.2995 9.94444 17.9167ZM19.25 17.2222C19.6328 17.2222 19.9444 17.5338 19.9444 17.9167C19.9444 18.2995 19.6328 18.6111 19.25 18.6111C18.8672 18.6111 18.5556 18.2995 18.5556 17.9167C18.5556 17.5338 18.8672 17.2222 19.25 17.2222Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
      <Transition name="mobile-menu">
        <div
          v-if="showMobileMenu"
          class="absolute left-0 top-full w-full overflow-y-auto rounded-b-md bg-light pb-16 pt-14"
          :style="{
            maxHeight: headerHeight ? `calc(100vh - ${headerHeight + (reduceHeaderPadding ? 16 : 0)}px)` : '100vh',
          }"
        >
          <nav>
            <Categories
              :disable-categories="[modifiedPath]"
              :highlight-categories="[categories.find(category => modifiedPath.includes(category))]"
            />
          </nav>
        </div>
      </Transition>
    </div>
  </header>
  <Transition name="mobile-menu-overlay">
    <div
      v-if="showMobileMenu"
      class="fixed left-0 top-0 z-10 h-screen w-screen bg-dark opacity-40"
      @click="toggleMobileMenu"
    ></div>
  </Transition>
</template>

<style lang="scss">
.mobile-menu-button-enter-active,
.mobile-menu-button-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.mobile-menu-button-leave-active {
  position: absolute;
  top: 0;
  left: 0;
}

.mobile-menu-button-enter-from,
.mobile-menu-button-leave-to {
  opacity: 0;
  transform: rotate(180deg);
  transform-origin: center;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.25s ease;
  overflow: hidden;
  .categoryCard {
    transition: transform 0.25s ease;
  }
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  .categoryCard {
    transform: translateY(1rem);
  }
}

.mobile-menu-overlay-enter-active,
.mobile-menu-overlay-leave-active {
  transition: opacity 0.25s ease;
}

.mobile-menu-overlay-enter-from,
.mobile-menu-overlay-leave-to {
  opacity: 0;
}
</style>
