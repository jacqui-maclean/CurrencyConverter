import { configureStore } from "@reduxjs/toolkit";
import converterReducer from "../Converter/Converter/converterSlice";

export const store = configureStore({
  reducer: {
    convert: converterReducer,
  },
});
