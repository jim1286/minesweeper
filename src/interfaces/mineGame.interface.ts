import { ItemEnum, ItemActionEnum, GameLevelEnum } from "@/enums";

export interface Item {
  id: string;
  type: ItemEnum;
  actionType: ItemActionEnum;
  aroundMineNum: number;
}

export interface GameOption {
  gameLevel: GameLevelEnum;
  gameBoardSize: GameBoardSize;
  mineNumber: number;
}

export interface GameBoardSize {
  row: number;
  column: number;
}
