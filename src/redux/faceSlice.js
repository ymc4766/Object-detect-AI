import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const faceSlice = createSlice({
  name: "facerecognition",
  initialState,
  reducers: {
    faceRecog: (state) => {
      console.log(state);
    },
  },
});

export const { faceRecog } = faceSlice.actions;

export default faceSlice.reducer;
