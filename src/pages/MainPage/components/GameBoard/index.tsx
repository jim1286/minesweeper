import { nanoid } from "@reduxjs/toolkit";
import { Header, ItemComponent } from "./components";
import { BoardContainer, Container, ItemWrap } from "./styles";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  setItems,
  setLoseGame,
  setStartGame,
  setWinGame,
} from "@/redux/features";
import { Item } from "@/interfaces";
import { useMineGame } from "@/hooks";
import { ItemActionEnum, ItemEnum } from "@/enums";
import { cloneDeep } from "lodash";

function GameBoard() {
  const dispatch = useAppDispatch();
  const { convertedItems, getNewItems } = useMineGame();
  const startGame = useAppSelector((state) => state.mineGameSlice.startGame);
  const mineNumber = useAppSelector((state) => state.mineGameSlice.mineNumber);
  const gameBoardSize = useAppSelector(
    (state) => state.mineGameSlice.gameBoardSize
  );
  const items: Item[][] | undefined[][] =
    useAppSelector((state) => state.mineGameSlice.items) ||
    Array.from(Array(gameBoardSize.column), () =>
      new Array(gameBoardSize.row).fill(undefined)
    );

  const handleClick = (columnIndex: number, rowIndex: number, item?: Item) => {
    if (!startGame) {
      const newItems: Item[][] = getNewItems(gameBoardSize, mineNumber);
      convertedItems(newItems, gameBoardSize, columnIndex, rowIndex);
      dispatch(setItems(newItems));
      dispatch(setStartGame());
      return;
    }

    if (!item) {
      return;
    }

    switch (item.type) {
      case ItemEnum.MINE: {
        dispatch(setLoseGame());
        break;
      }
      case ItemEnum.NOT_MINE: {
        const newItems: Item[][] = cloneDeep(items) as Item[][];
        convertedItems(newItems, gameBoardSize, columnIndex, rowIndex);
        dispatch(setItems(newItems));

        const mineNum = newItems
          .flat()
          .filter((newItem) => newItem.type === ItemEnum.MINE).length;

        if (mineNum === 0) {
          dispatch(setWinGame());
        }
        break;
      }
    }
  };

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    columnIndex: number,
    rowIndex: number
  ) => {
    e.preventDefault();

    if (!startGame) {
      return;
    }

    const newItems: Item[][] = cloneDeep(items) as Item[][];
    newItems[columnIndex][rowIndex].actionType = ItemActionEnum.FLAG;
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
                item={item}
                onClick={handleClick}
                onContextMenu={handleContextMenu}
                rowIndex={rowIndex}
                columnIndex={columnIndex}
              />
            ))}
          </ItemWrap>
        ))}
      </BoardContainer>
    </Container>
  );
}

export default GameBoard;
