export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive("click-outside", {
    beforeMount(el, binding) {
      el.clickOutsideEvent = event => {
        if (!(el == event.target || el.contains(event.target))) {
          if (typeof binding.value !== "function") {
            console.error("Argument for click-outside binding must be a function, error occurred on:", el);
            return;
          }
          binding.value();
        }
      };
      document.addEventListener("click", el.clickOutsideEvent);
    },
    unmounted(el) {
      document.removeEventListener("click", el.clickOutsideEvent);
    },
  });
});
