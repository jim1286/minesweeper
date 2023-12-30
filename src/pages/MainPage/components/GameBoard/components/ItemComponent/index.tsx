import { nanoid } from "@reduxjs/toolkit";
import { Container } from "./styles";
import { GameBoardSize, Item } from "@/interfaces";
import { GameResultEnum, ItemActionEnum, ItemEnum } from "@/enums";
import { IconFlag } from "@tabler/icons-react";
import { useAppSelector } from "@/redux/hook";

interface Props {
  rowIndex: number;
  columnIndex: number;
  currentPosition: React.MutableRefObject<GameBoardSize | undefined>;
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
  currentPosition,
  item,
  onClick,
  onContextMenu,
}: Props) {
  const gameResult = useAppSelector((state) => state.mineGameSlice.gameResult);

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
      isChecked={item?.actionType === ItemActionEnum.CHECKED}
      isMine={
        gameResult === GameResultEnum.LOST &&
        currentPosition.current &&
        currentPosition.current.row === rowIndex &&
        currentPosition.current.column === columnIndex
      }
      mineNumber={item?.aroundMineNum}
      onClick={() => onClick(columnIndex, rowIndex, item)}
      onContextMenu={(e) => onContextMenu(e, columnIndex, rowIndex)}
    >
      {item?.type === ItemEnum.MINE && gameResult === GameResultEnum.LOST
        ? "💣"
        : item?.type === ItemEnum.MINE && gameResult === GameResultEnum.WIN
        ? "🎉"
        : null}
      {renderItemValue}
    </Container>
  );
}

export default ItemComponent;
