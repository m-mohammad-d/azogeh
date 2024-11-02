import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cart from "../types/CartType";
import { Product } from "../types/product";
import { updateCart } from "../utils/updateCart";

const initialCartState: Cart = {
  orderItems: [],
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  shippingAddress: undefined,
  paymentMethod: undefined,
};

const persistedCartState: Cart | null = JSON.parse(localStorage.getItem("cart")!);
const initialState: Cart = persistedCartState || initialCartState;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (cart, action: PayloadAction<Product>): void => {
      const newItem = action.payload;
      const existingItem = cart.orderItems.find(item => item._id === newItem._id);

      if (existingItem) {
        cart.orderItems = cart.orderItems.map(item =>
          item._id === newItem._id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        cart.orderItems.push({ ...newItem, qty: 1 });
      }

      cart = updateCart(cart);
      localStorage.setItem("cart", JSON.stringify(cart));
    },

    removeFromCart: (cart, action: PayloadAction<{ _id: string }>) => {
      cart.orderItems = cart.orderItems.filter(item => item._id !== action.payload._id);

      cart = updateCart(cart);
      localStorage.setItem("cart", JSON.stringify(cart));
    },

    increaseQuantity: (cart, action: PayloadAction<string>) => {
      const itemIndex = cart.orderItems.findIndex(item => item._id === action.payload);
      if (itemIndex !== -1) {
        cart.orderItems[itemIndex].qty += 1;
      }

      cart = updateCart(cart);
      localStorage.setItem("cart", JSON.stringify(cart));
    },

    decreaseQuantity: (cart, action: PayloadAction<string>) => {
      const itemIndex = cart.orderItems.findIndex(item => item._id === action.payload);
      if (itemIndex !== -1) {
        if (cart.orderItems[itemIndex].qty > 1) {
          cart.orderItems[itemIndex].qty -= 1; 
        } else {
          cart.orderItems = cart.orderItems.filter(item => item._id !== action.payload); 
        }
      }

      cart = updateCart(cart);
      localStorage.setItem("cart", JSON.stringify(cart));
    },

    resetCart: cart => {
      cart.orderItems = [];
      cart.itemsPrice = 0;
      cart.shippingPrice = 0;
      cart.taxPrice = 0;
      cart.totalPrice = 0;
      cart.shippingAddress = undefined;
      cart.paymentMethod = undefined;

      localStorage.removeItem("cart"); 
    },

    saveShippingAddress: (cart, action: PayloadAction<string>) => {
      cart.shippingAddress = action.payload;

      cart = updateCart(cart);
      localStorage.setItem("cart", JSON.stringify(cart));
    },

    savePaymentMethod: (cart, action: PayloadAction<string>) => {
      cart.paymentMethod = action.payload;

      cart = updateCart(cart);
      localStorage.setItem("cart", JSON.stringify(cart));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  resetCart,
  saveShippingAddress,
  savePaymentMethod,
} = cartSlice.actions;

export default cartSlice.reducer;
