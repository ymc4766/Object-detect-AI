import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  status: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCrediantials: (state, action) => {
      state.userInfo = action.payload;
      state.status = "succeeded";
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.userInfo = null;
      state.status = "";
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCrediantials, logoutUser } = authSlice.actions;

export default authSlice.reducer;
