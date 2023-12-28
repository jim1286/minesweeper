import { nanoid } from "@reduxjs/toolkit";
import { Header, ItemComponent } from "./components";
import { BoardContainer, Container, ItemWrap } from "./styles";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setItems, setStartGame } from "@/redux/features";
import { Item } from "@/interfaces";
import { useMineGame } from "@/hooks";

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

  const handleClick = (columnIndex: number, rowIndex: number) => {
    // if (!startGame) {
    const newItems: Item[][] = getNewItems(gameBoardSize, mineNumber);
    convertedItems(newItems, gameBoardSize, columnIndex, rowIndex);
    dispatch(setItems(newItems));
    //   dispatch(setStartGame());
    //   return;
    // }
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
