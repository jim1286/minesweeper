import { IconMoodHappy, IconMoodSad, IconMoodSmile } from "@tabler/icons-react";
import { Container, IconContainer, Wrap } from "./styles";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { GameResultEnum, ItemActionEnum } from "@/enums";
import { resetGame } from "@/redux/features";
import { useEffect, useState } from "react";

function Header() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.mineGameSlice.items);
  const startGame = useAppSelector((state) => state.mineGameSlice.startGame);
  const mineNumber = useAppSelector((state) => state.mineGameSlice.mineNumber);
  const gameResult = useAppSelector((state) => state.mineGameSlice.gameResult);
  const usedFlagNumber = items
    ?.flat()
    .filter((newItems) => newItems.actionType === ItemActionEnum.FLAG).length;
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!startGame) {
      setSeconds(0);
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [startGame]);

  const handleClickReset = () => {
    dispatch(resetGame());
  };

  return (
    <Container>
      <Wrap>{usedFlagNumber ? mineNumber - usedFlagNumber : 0}</Wrap>

      <IconContainer onClick={handleClickReset}>
        {!gameResult ? (
          <IconMoodSmile fill="yellow" />
        ) : gameResult === GameResultEnum.WIN ? (
          <IconMoodHappy fill="yellow" />
        ) : (
          <IconMoodSad fill="yellow" />
        )}
      </IconContainer>
      <Wrap>{seconds}</Wrap>
    </Container>
  );
}

export default Header;
