import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../services/ApiProduct";
import apiSlice from "../services/UsersApi";
import cartReducer from "../store/CartSlice";
import authReducer from "../store/AuthSlice";
const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartReducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(productsApi.middleware, apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
