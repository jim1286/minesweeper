import { Popover } from "antd";
import { Container, ContentWrap, TitleWrap } from "./styles";
import { useState } from "react";
import { GameLevelEnum } from "@/enums";
import { GameOption } from "@/interfaces";
import { useAppDispatch } from "@/redux/hook";
import { setGameOption } from "@/redux/features";
import { ContentComponent, CustomModal } from "./components";

function Header() {
  const dispatch = useAppDispatch();
  const [popOpen, setPopOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setPopOpen(false);
    setIsModalOpen(true);
  };

  const handleOk = (customOption: GameOption) => {
    dispatch(setGameOption(customOption));
    localStorage.setItem("gameOption", JSON.stringify(customOption));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleLevel = (gameLevel: GameLevelEnum) => {
    let newGameOption: GameOption;

    switch (gameLevel) {
      case GameLevelEnum.BEGINNER: {
        newGameOption = {
          gameLevel: GameLevelEnum.BEGINNER,
          gameBoardSize: {
            row: 8,
            column: 8,
          },
          mineNumber: 10,
        };

        break;
      }
      case GameLevelEnum.INTERMEDIATE: {
        newGameOption = {
          gameLevel: GameLevelEnum.INTERMEDIATE,
          gameBoardSize: {
            row: 16,
            column: 16,
          },
          mineNumber: 40,
        };

        break;
      }
      case GameLevelEnum.EXPERT: {
        newGameOption = {
          gameLevel: GameLevelEnum.EXPERT,
          gameBoardSize: {
            row: 32,
            column: 16,
          },
          mineNumber: 100,
        };

        break;
      }
      case GameLevelEnum.CUSTOM: {
        showModal();
        return;
      }
    }

    localStorage.setItem("gameOption", JSON.stringify(newGameOption));
    dispatch(setGameOption(newGameOption));
    setPopOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setPopOpen(newOpen);
  };

  return (
    <Container>
      <Popover
        style={{ width: "30%", cursor: "pointer" }}
        content={
          <ContentWrap>
            <ContentComponent
              gameLevel={GameLevelEnum.BEGINNER}
              onClick={handleLevel}
            />
            <ContentComponent
              gameLevel={GameLevelEnum.INTERMEDIATE}
              onClick={handleLevel}
            />
            <ContentComponent
              gameLevel={GameLevelEnum.EXPERT}
              onClick={handleLevel}
            />
            <ContentComponent
              gameLevel={GameLevelEnum.CUSTOM}
              onClick={handleLevel}
            />
          </ContentWrap>
        }
        title="Chose Level"
        trigger="click"
        open={popOpen}
        onOpenChange={handleOpenChange}
      >
        <TitleWrap>Game</TitleWrap>
      </Popover>
      <CustomModal
        isModalOpen={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </Container>
  );
}

export default Header;
