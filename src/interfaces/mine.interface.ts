import { ItemType, ItemActionType } from "@/enums";

export interface Item {
  id: string;
  type: ItemType;
  actionType: ItemActionType;
}
