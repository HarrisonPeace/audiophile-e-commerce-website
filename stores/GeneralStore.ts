import { ref } from "vue";

import { defineStore } from "pinia";

export const useGeneralStore = defineStore("GeneralStore", () => {
  const headerHeight = ref(0);
  const reduceHeaderPadding = ref(false);
  const headerPaddingReductionAmount = ref(32);

  return {
    headerHeight,
    reduceHeaderPadding,
    headerPaddingReductionAmount,
  };
});
