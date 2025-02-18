import { configureStore } from "@reduxjs/toolkit";
import inputsReducer from "./Inputs.slice.js";

const store = configureStore({
  reducer: {
    inputs: inputsReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
