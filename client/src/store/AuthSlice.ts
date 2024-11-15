import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("authToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token } = action.payload;
      localStorage.setItem("authToken", token);
      state.userInfo = token;
    },
    clearCredentials: state => {
      localStorage.removeItem("authToken");
      state.userInfo = null;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
