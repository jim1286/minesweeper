import { configureStore } from "@reduxjs/toolkit";
import mineSlice from "./features/mine.slices";

export const store = configureStore({
  reducer: {
    mineSlice: mineSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
