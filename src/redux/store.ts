import { configureStore } from "@reduxjs/toolkit";
import mineGameSlice from "./features/mineGame.slices";

export const store = configureStore({
  reducer: {
    mineGameSlice: mineGameSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
