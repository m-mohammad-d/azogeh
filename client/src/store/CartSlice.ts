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
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item._id === action.payload._id);

      if (existingItem) {
        existingItem.quantity += action.payload.quantity; // Update quantity if item already exists
      } else {
        state.items.push(action.payload); // Add new item
      }

      setItemLocal("cart", state.items); // Update local storage
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item._id !== action.payload); // Remove item by ID
      setItemLocal("cart", state.items); // Update local storage
    },

    clearCart: state => {
      state.items = [];
      setItemLocal("cart", state.items); // Clear local storage
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
