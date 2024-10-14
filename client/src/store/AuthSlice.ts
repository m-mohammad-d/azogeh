import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Auth, { Token } from "../types/AuthType";

const initialState: Auth = {
  userInfo: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")!) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (auth, action: PayloadAction<Token>) => {
      auth.userInfo = action.payload;
      localStorage.setItem("token", JSON.stringify(action.payload));
    },

    clearCredentials: auth => {
      auth.userInfo = undefined;
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
