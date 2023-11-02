import { ref } from "vue";

import { defineStore } from "pinia";

export const useGeneralStore = defineStore("GeneralStore", () => {
  const headerHeight = ref(0);
  const reduceHeaderPadding = ref(false);

  // headerPaddingReductionAmount correlates with headerPadding and they must be updated together
  const headerPaddingReductionAmount = ref(32);

  const dynamicHeaderHeight = computed(() => {
    return headerHeight.value - (reduceHeaderPadding.value ? headerPaddingReductionAmount.value : 0);
  });

  return {
    headerHeight,
    reduceHeaderPadding,
    headerPaddingReductionAmount,
    dynamicHeaderHeight,
  };
});
