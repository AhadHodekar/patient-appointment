export const discountCalculator = (discountPercent, fee) => {
  return fee - (fee * discountPercent) / 100;
};
