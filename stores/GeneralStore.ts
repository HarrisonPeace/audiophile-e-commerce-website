import { ref } from "vue";

import { defineStore } from "pinia";

export const useGeneralStore = defineStore("GeneralStore", () => {
  const headerHeight = ref(0);
  const reduceHeaderPadding = ref(false);

  return {
    headerHeight,
    reduceHeaderPadding,
  };
});
