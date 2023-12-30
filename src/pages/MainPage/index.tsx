import { useEffect } from "react";
import { GameBoard, Header } from "./components";
import { Container, GameBoardContainer } from "./styles";
import { useAppDispatch } from "@/redux/hook";
import { setGameOption } from "@/redux/features";

function MainPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const localGameOption = localStorage.getItem("gameOption");

    if (localGameOption) {
      dispatch(setGameOption(JSON.parse(localGameOption)));
    }
  }, []);

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
