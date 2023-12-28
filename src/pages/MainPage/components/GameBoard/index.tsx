import { nanoid } from "@reduxjs/toolkit";
import { Header, Item } from "./components";
import { BoardContainer, Container, ItemWrap } from "./styles";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setStartGame } from "@/redux/features";

function GameBoard() {
  const dispatch = useAppDispatch();
  const startGame = useAppSelector((state) => state.mineGameSlice.startGame);
  const arr = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 2],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 3],
  ];

  const handleClick = (rowIndex: number, columnIndex: number) => {
    if (!startGame) {
      const newMines = [];

      dispatch(setStartGame());
      return;
    }
  };

  return (
    <Container>
      <Header />
      <BoardContainer>
        {arr.map((ele, rowIndex) => (
          <ItemWrap key={nanoid()}>
            {ele.map((_, columnIndex) => (
              <Item
                key={nanoid()}
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
