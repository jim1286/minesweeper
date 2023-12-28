import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type MineSliceState = {};

const initialState: MineSliceState = {};

export const mineSlice = createSlice({
  name: "mine",
  initialState,
  reducers: {},
});

export const {} = mineSlice.actions;
export default mineSlice.reducer;
