export function useHelpers() {
  function productIsNew(date: Date) {
    const comparisonDate = new Date();
    // All products are new for 3 months
    comparisonDate.setMonth(comparisonDate.getMonth() - 3);
    return date >= comparisonDate;
  }

  return {
    productIsNew,
  };
}
