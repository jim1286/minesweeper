import { ItemType, ItemActionType } from "@/enums";
import { GameBoardSize, Item } from "@/interfaces";
import { nanoid } from "@reduxjs/toolkit";

const useMineGame = () => {
  const getNewItems = (gameBoardSize: GameBoardSize, mineNumber: number) => {
    const newItems: Item[][] = [];

    for (let i = 0; i < gameBoardSize.column; i++) {
      const newRow: Item[] = [];
      for (let j = 0; j < gameBoardSize.row; j++) {
        newRow.push({
          id: nanoid(),
          type: ItemType.NOT_MINE,
          actionType: ItemActionType.UNCHECKED,
          aroundMineNum: 0,
        });
      }

      newItems.push(newRow);
    }

    let newMineNumber = mineNumber;

    while (newMineNumber >= 1) {
      const randomRow = Math.floor(Math.random() * gameBoardSize.row);
      const randomColumn = Math.floor(Math.random() * gameBoardSize.column);

      if (newItems[randomColumn][randomRow].type === ItemType.NOT_MINE) {
        newItems[randomColumn][randomRow].type = ItemType.MINE;
        newMineNumber--;
      }
    }

    return newItems;
  };

  const convertedItems = (
    items: Item[][],
    gameBoardSize: GameBoardSize,
    columnIndex: number,
    rowIndex: number
  ) => {
    items[columnIndex][rowIndex].actionType = ItemActionType.CHECKED;

    const dx = [-1, 1, 0, 0, -1, -1, 1, 1];
    const dy = [0, 0, -1, 1, -1, 1, -1, 1];

    for (let i = 0; i < 8; i++) {
      const checkX = columnIndex + dx[i];
      const checkY = rowIndex + dy[i];

      if (
        checkLength(checkX, checkY, gameBoardSize.column, gameBoardSize.row) &&
        items[checkX][checkY].type === ItemType.MINE
      ) {
        items[columnIndex][rowIndex].aroundMineNum++;
      }
    }

    for (let i = 0; i < 8; i++) {
      const checkX = columnIndex + dx[i];
      const checkY = rowIndex + dy[i];

      if (
        checkLength(checkX, checkY, gameBoardSize.column, gameBoardSize.row) &&
        items[checkX][checkY].actionType === ItemActionType.UNCHECKED &&
        items[columnIndex][rowIndex].aroundMineNum === 0
      ) {
        convertedItems(items, gameBoardSize, checkX, checkY);
      }
    }
  };

  const checkLength = (
    checkX: number,
    checkY: number,
    columnSize: number,
    rowSize: number
  ) => {
    if (checkX >= 0 && checkY >= 0 && checkX < columnSize && checkY < rowSize) {
      return true;
    }

    return false;
  };

  return { convertedItems, getNewItems };
};

export default useMineGame;
