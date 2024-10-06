import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../services/ApiProduct";
import cartReducer from "../store/CartSlice"; 

const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    cart: cartReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(productsApi.middleware),
});

export default store;
