import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("authToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearCredentials: (state) => {
      localStorage.removeItem("authToken");
      state.userInfo = null;
    },
  },
});

export const { clearCredentials } = authSlice.actions;
export default authSlice.reducer;
