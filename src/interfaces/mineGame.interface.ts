import { ItemType, ItemActionType } from "@/enums";

export interface Item {
  id: string;
  type: ItemType;
  actionType: ItemActionType;
  aroundMineNum: number;
}

export interface GameBoardSize {
  row: number;
  column: number;
}
