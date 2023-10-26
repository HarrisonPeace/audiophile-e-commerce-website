const { products } = storeToRefs(useProductStore());

export function useHelpers() {
  function productIsNew(date: Date): boolean {
    const comparisonDate = new Date();
    // All products are new for 3 months
    comparisonDate.setMonth(comparisonDate.getMonth() - 3);
    return date >= comparisonDate;
  }

  const convertPrice = (price: number): string => {
    if (price < 1000) return `${price}`;
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const getTotalCost = (values: { [productKey: string]: number }) => {
    return products.value.reduce((acc, curr) => {
      return acc + (curr?.price ?? 0) * (values[curr?.key ?? ""] ?? 0);
    }, 0);
  };

  return {
    productIsNew,
    convertPrice,
    getTotalCost,
  };
}
