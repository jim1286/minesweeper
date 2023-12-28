import { nanoid } from "@reduxjs/toolkit";
import { Container } from "./styles";
import { Item } from "@/interfaces";
import { ItemActionType, ItemType } from "@/enums";

interface Props {
  rowIndex: number;
  columnIndex: number;
  item?: Item;
  onClick: (columnIndex: number, rowIndex: number) => void;
}

function ItemComponent({ rowIndex, columnIndex, item, onClick }: Props) {
  // const renderItemValue = (() => {
  //   if (!item) {
  //     return null;
  //   }

  // })();

  return (
    <Container key={nanoid()} onClick={() => onClick(columnIndex, rowIndex)}>
      {item?.type === ItemType.MINE && "x"}
      {item?.type === ItemType.NOT_MINE &&
        item?.actionType === ItemActionType.CHECKED &&
        item.aroundMineNum}
    </Container>
  );
}

export default ItemComponent;
