import { nanoid } from "@reduxjs/toolkit";
import { Header, ItemComponent } from "./components";
import { BoardContainer, Container, ItemWrap } from "./styles";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  resetGame,
  setItems,
  setLoseGame,
  setStartGame,
  setStopGame,
  setWinGame,
} from "@/redux/features";
import { GameBoardSize, Item } from "@/interfaces";
import { useMineGame } from "@/hooks";
import { ItemActionEnum, ItemEnum } from "@/enums";
import { cloneDeep } from "lodash";
import { useEffect, useRef } from "react";

function GameBoard() {
  const dispatch = useAppDispatch();
  const { convertedItems, getNewItems } = useMineGame();
  const startGame = useAppSelector((state) => state.mineGameSlice.startGame);
  const gameOption = useAppSelector((state) => state.mineGameSlice.gameOption);
  const gameResult = useAppSelector((state) => state.mineGameSlice.gameResult);
  const currentPosition = useRef<GameBoardSize | undefined>(undefined);

  const items: Item[][] | undefined[][] =
    useAppSelector((state) => state.mineGameSlice.items) ||
    Array.from(Array(gameOption.gameBoardSize.column), () =>
      new Array(gameOption.gameBoardSize.row).fill(undefined)
    );

  useEffect(() => {
    if (gameOption) {
      dispatch(resetGame());
    }
  }, [gameOption]);

  const handleClick = (columnIndex: number, rowIndex: number, item?: Item) => {
    if (gameResult) {
      return;
    }

    currentPosition.current = {
      row: rowIndex,
      column: columnIndex,
    };

    if (!startGame) {
      const newItems: Item[][] = getNewItems(
        gameOption.gameBoardSize,
        gameOption.mineNumber,
        columnIndex,
        rowIndex
      );
      dispatch(setStartGame());
      handleNotMine(newItems, columnIndex, rowIndex);
      return;
    }

    if (
      !item ||
      item.actionType === ItemActionEnum.FLAG ||
      item.actionType === ItemActionEnum.CHECKED
    ) {
      return;
    }

    const newItems: Item[][] = cloneDeep(items) as Item[][];

    switch (item.type) {
      case ItemEnum.MINE: {
        newItems[columnIndex][rowIndex] = {
          ...item,
          actionType: ItemActionEnum.CHECKED,
        };

        dispatch(setItems(newItems));
        dispatch(setLoseGame());
        dispatch(setStopGame());
        break;
      }
      case ItemEnum.NOT_MINE: {
        handleNotMine(newItems, columnIndex, rowIndex);
        break;
      }
    }
  };

  const handleNotMine = (
    newItems: Item[][],
    columnIndex: number,
    rowIndex: number
  ) => {
    convertedItems(newItems, gameOption.gameBoardSize, columnIndex, rowIndex);
    dispatch(setItems(newItems));
    const unCheckedItemNumber = newItems
      .flat()
      .filter(
        (newItems) =>
          newItems.actionType === ItemActionEnum.UNCHECKED ||
          newItems.actionType === ItemActionEnum.FLAG
      ).length;

    if (unCheckedItemNumber === gameOption.mineNumber) {
      dispatch(setWinGame());
      dispatch(setStopGame());
    }
  };

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    columnIndex: number,
    rowIndex: number
  ) => {
    e.preventDefault();

    if (!startGame || gameResult) {
      return;
    }

    const newItems: Item[][] = cloneDeep(items) as Item[][];
    const item = newItems[columnIndex][rowIndex];

    switch (item.actionType) {
      case ItemActionEnum.CHECKED: {
        break;
      }
      case ItemActionEnum.UNCHECKED: {
        item.actionType = ItemActionEnum.FLAG;
        break;
      }
      case ItemActionEnum.FLAG: {
        item.actionType = ItemActionEnum.UNCHECKED;
        break;
      }
    }
    dispatch(setItems(newItems));
  };

  return (
    <Container>
      <Header />
      <BoardContainer>
        {items.map((itemColumn, columnIndex) => (
          <ItemWrap key={nanoid()}>
            {itemColumn.map((item, rowIndex) => (
              <ItemComponent
                key={nanoid()}
                rowIndex={rowIndex}
                columnIndex={columnIndex}
                currentPosition={currentPosition}
                item={item}
                onClick={handleClick}
                onContextMenu={handleContextMenu}
              />
            ))}
          </ItemWrap>
        ))}
      </BoardContainer>
    </Container>
  );
}

export default GameBoard;
