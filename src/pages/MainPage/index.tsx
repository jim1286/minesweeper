import { GameBoard, Header } from "./components";
import { Container, GameBoardContainer } from "./styles";

function MainPage() {
  return (
    <Container>
      <GameBoardContainer>
        <Header />
        <GameBoard />
      </GameBoardContainer>
    </Container>
  );
}

export default MainPage;
