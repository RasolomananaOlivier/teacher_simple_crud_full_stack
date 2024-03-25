export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("mg-MG").format(amount);
