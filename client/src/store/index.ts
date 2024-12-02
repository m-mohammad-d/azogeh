import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../services/ApiProduct";
import apiSlice from "../services/UsersApi";
import cartReducer from "../store/CartSlice";
import { imageApi } from "../services/UploadApi";
import { OrderApi } from "../services/OrderApi";

const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [imageApi.reducerPath]: imageApi.reducer,
    [OrderApi.reducerPath]: OrderApi.reducer,
    cart: cartReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      apiSlice.middleware,
      imageApi.middleware,
      OrderApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
