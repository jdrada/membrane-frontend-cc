export const formatUSD = (value: number | undefined) => {
  if (value === undefined) {
    return "";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const calculateUSDValue = (qty: number, price: number) => {
  return qty * price;
};
