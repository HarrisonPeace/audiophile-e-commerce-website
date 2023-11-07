type clickOutsideElement = HTMLElement & { clickOutsideEvent: (event: MouseEvent) => void };

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive("click-outside", {
    beforeMount(el: clickOutsideElement, binding: any) {
      el.clickOutsideEvent = (event: MouseEvent) => {
        if (!(el == event.target || el.contains(event.target as Node))) {
          if (typeof binding.value !== "function") {
            console.error("Argument for click-outside binding must be a function, error occurred on:", el);
            return;
          }
          binding.value();
        }
      };
      document.addEventListener("click", el.clickOutsideEvent);
    },
    unmounted(el: clickOutsideElement) {
      document.removeEventListener("click", el.clickOutsideEvent);
    },
  });
});
