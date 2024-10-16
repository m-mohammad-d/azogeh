import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("authToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (auth, action) => {
      auth.userInfo = action.payload;
      localStorage.setItem("authToken", JSON.stringify(action.payload));
    },
    clearCredentials: auth => {
      auth.userInfo = null;
      localStorage.removeItem("authToken");
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
