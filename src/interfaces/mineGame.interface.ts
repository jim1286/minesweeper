import { ItemEnum, ItemActionEnum } from "@/enums";

export interface Item {
  id: string;
  type: ItemEnum;
  actionType: ItemActionEnum;
  aroundMineNum: number;
}

export interface GameBoardSize {
  row: number;
  column: number;
}
