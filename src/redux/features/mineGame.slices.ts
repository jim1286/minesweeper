import { GameLevelEnum, GameResultEnum } from "@/enums";
import { GameBoardSize, Item } from "@/interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type MineGameSliceState = {
  items?: Item[][];
  startGame: boolean;
  mineNumber: number;
  gameResult?: GameResultEnum;
  gameBoardSize: GameBoardSize;
  gameLevel?: GameLevelEnum;
};

const initialState: MineGameSliceState = {
  items: undefined,
  startGame: false,
  mineNumber: 3,
  gameResult: undefined,
  gameBoardSize: { row: 6, column: 4 },
  gameLevel: undefined,
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
    setGameLevel: (state, action: PayloadAction<GameLevelEnum>) => {
      state.gameLevel = action.payload;
    },
    setGameBoardSize: (state, action: PayloadAction<GameBoardSize>) => {
      state.gameBoardSize = action.payload;
    },
    setMineNumber: (state, action: PayloadAction<number>) => {
      state.mineNumber = action.payload;
    },
    resetGame: (state) => {
      state.items = undefined;
      state.startGame = false;
      state.gameResult = undefined;
    },
  },
});

export const {
  setStartGame,
  setStopGame,
  setWinGame,
  setLoseGame,
  setItems,
  setGameLevel,
  setGameBoardSize,
  setMineNumber,
  resetGame,
} = mineGameSlice.actions;
export default mineGameSlice.reducer;
