import Cart from "../types/CartType";

// to round numbers to two decimal places
const roundToTwoDecimals = (num: number): number => {
  return +(Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (cart: Cart): Cart => {
  // Calculate items price by summing up the prices of all items in the cart
  const subtotal = cart.orderItems.reduce((acc, item) => (acc + item.price) * item.qty, 0);
  cart.itemsPrice = roundToTwoDecimals(subtotal);

  // Calculate shipping price (free if order is over $100, otherwise $10 shipping)
  cart.shippingPrice = roundToTwoDecimals(subtotal >= 100 ? 0 : 10);

  // Calculate tax price (5% tax)
  cart.taxPrice = roundToTwoDecimals(+(subtotal * 0.05).toFixed(2));

  // Calculate total price by adding items price, shipping price, and tax price
  cart.totalPrice = +(cart.itemsPrice + cart.shippingPrice + cart.taxPrice).toFixed(2);

  return cart;
};
