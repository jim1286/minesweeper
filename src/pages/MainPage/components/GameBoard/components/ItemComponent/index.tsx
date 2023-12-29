import { nanoid } from "@reduxjs/toolkit";
import { Container } from "./styles";
import { Item } from "@/interfaces";
import { ItemActionEnum, ItemEnum } from "@/enums";
import { IconFlag } from "@tabler/icons-react";

interface Props {
  rowIndex: number;
  columnIndex: number;
  item?: Item;
  onClick: (columnIndex: number, rowIndex: number, item?: Item) => void;
  onContextMenu: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    columnIndex: number,
    rowIndex: number
  ) => void;
}

function ItemComponent({
  rowIndex,
  columnIndex,
  item,
  onClick,
  onContextMenu,
}: Props) {
  const renderItemValue = (() => {
    if (!item) {
      return null;
    }

    switch (item.actionType) {
      case ItemActionEnum.CHECKED: {
        return item.aroundMineNum !== 0 && item.aroundMineNum;
      }
      case ItemActionEnum.UNCHECKED: {
        return null;
      }
      case ItemActionEnum.FLAG: {
        return <IconFlag fill="red" />;
      }
    }
  })();

  return (
    <Container
      key={nanoid()}
      isBlock={
        item?.aroundMineNum === 0 && item?.actionType === ItemActionEnum.CHECKED
      }
      mineNumber={item?.aroundMineNum}
      onClick={() => onClick(columnIndex, rowIndex, item)}
      onContextMenu={(e) => onContextMenu(e, columnIndex, rowIndex)}
    >
      {item?.type === ItemEnum.MINE && "x"}
      {renderItemValue}
    </Container>
  );
}

export default ItemComponent;
