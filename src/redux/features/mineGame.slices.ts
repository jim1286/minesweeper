import { GameResultEnum } from "@/enums";
import { GameBoardSize, Item } from "@/interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type MineGameSliceState = {
  items?: Item[][];
  startGame: boolean;
  mineNumber: number;
  gameResult?: GameResultEnum;
  gameBoardSize: GameBoardSize;
  level?: number;
};

const initialState: MineGameSliceState = {
  items: undefined,
  startGame: false,
  mineNumber: 3,
  gameResult: undefined,
  gameBoardSize: { row: 6, column: 4 },
  level: undefined,
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
    setWinGame: (state) => {
      state.gameResult = GameResultEnum.WIN;
    },
    setLoseGame: (state) => {
      state.gameResult = GameResultEnum.LOST;
    },
    setItems: (state, action: PayloadAction<Item[][]>) => {
      state.items = action.payload;
    },
    setLevel: (state, action: PayloadAction<number>) => {
      state.level = action.payload;
    },
    setGameBoardSize: (state, action: PayloadAction<GameBoardSize>) => {
      state.gameBoardSize = action.payload;
    },
    setMineNumber: (state, action: PayloadAction<number>) => {
      state.mineNumber = action.payload;
    },
  },
});

export const {
  setStartGame,
  setStopGame,
  setWinGame,
  setLoseGame,
  setItems,
  setGameBoardSize,
} = mineGameSlice.actions;
export default mineGameSlice.reducer;
