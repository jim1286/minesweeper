import { nanoid } from "@reduxjs/toolkit";
import { Header } from "./components";
import { Container, MineContainer, MineItem, MineWrap } from "./styles";

function MineBoard() {
  const arr = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 2],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 3],
  ];

  return (
    <Container>
      <Header />
      <MineContainer>
        {arr.map((ele) => (
          <MineWrap key={nanoid()}>
            {ele.map((e) => (
              <MineItem>{e}</MineItem>
            ))}
          </MineWrap>
        ))}
      </MineContainer>
    </Container>
  );
}

export default MineBoard;
