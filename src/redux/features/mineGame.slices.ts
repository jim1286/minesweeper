import { Item } from "@/interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type MineGameSliceState = {
  items: Item[];
  startGame: boolean;
  level?: number;
  mineCount: number;
};

const initialState: MineGameSliceState = {
  items: [],
  startGame: false,
  level: undefined,
  mineCount: 0,
};

export const mineGameSlice = createSlice({
  name: "mineGame",
  initialState,
  reducers: {
    setStartGame: (state) => {
      state.startGame = true;
    },
    setStopGame: (state) => {
      state.startGame = false;
    },
    setItems: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    },
    setLevel: (state, action: PayloadAction<number>) => {
      state.level = action.payload;
    },
    setMineCount: (state, action: PayloadAction<number>) => {
      state.mineCount = action.payload;
    },
  },
});

export const { setStartGame, setStopGame, setItems } = mineGameSlice.actions;
export default mineGameSlice.reducer;
