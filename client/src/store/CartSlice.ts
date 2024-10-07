import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setItemLocal, getItemLocal } from "../utils/localStorageUtils";
import { Product } from "../types/product"; // Assuming Product type is here

// Cart item interface
export interface CartItem extends Product {
  quantity: number;
}

// Cart state interface
export interface CartState {
  items: CartItem[];
}

// Initial state
const initialState: CartState = {
  items: getItemLocal("cart") || [], // Retrieve cart from local storage or use empty array
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(item => item._id === newItem._id);

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 } as CartItem);
      }

      setItemLocal("cart", state.items); // Update local storage
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      setItemLocal("cart", state.items); // Update local storage
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex(item => item._id === action.payload);
      if (itemIndex !== -1) {
        state.items[itemIndex].quantity += 1;
      }
      setItemLocal("cart", state.items); // Update local storage
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex(item => item._id === action.payload);
      if (itemIndex !== -1 && state.items[itemIndex].quantity > 1) {
        state.items[itemIndex].quantity -= 1;
      } else {
        state.items = state.items.filter(item => item._id !== action.payload);
      }
      setItemLocal("cart", state.items); // Update local storage
    },
    clearCart: state => {
      state.items = [];
      setItemLocal("cart", state.items); // Clear local storage
    },
  },
});

export const { addItem, removeItem, increaseQuantity, decreaseQuantity , clearCart } = cartSlice.actions;
export default cartSlice.reducer;
