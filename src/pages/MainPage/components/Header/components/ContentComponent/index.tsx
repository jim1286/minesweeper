import { GameLevelEnum } from "@/enums";
import { Container } from "./styles";

interface Props {
  gameLevel: GameLevelEnum;
  onClick: (gameLevel: GameLevelEnum) => void;
}

function ContentComponent({ gameLevel, onClick }: Props) {
  return <Container onClick={() => onClick(gameLevel)}>{gameLevel}</Container>;
}

export default ContentComponent;
