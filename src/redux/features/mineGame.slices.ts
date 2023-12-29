import { GameLevelEnum, GameResultEnum } from "@/enums";
import { GameOption, Item } from "@/interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type MineGameSliceState = {
  items?: Item[][];
  startGame: boolean;
  gameOption: GameOption;
  gameResult?: GameResultEnum;
};

const initialState: MineGameSliceState = {
  items: undefined,
  startGame: false,
  gameOption: {
    gameLevel: GameLevelEnum.BEGINNER,
    gameBoardSize: {
      row: 8,
      column: 8,
    },
    mineNumber: 10,
  },
  gameResult: undefined,
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
    setGameOption: (state, action: PayloadAction<GameOption>) => {
      state.gameOption = action.payload;
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
  setGameOption,
  resetGame,
} = mineGameSlice.actions;
export default mineGameSlice.reducer;
