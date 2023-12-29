import { Modal, Popover } from "antd";
import { Container, Content, ContentWrap, TitleWrap } from "./styles";
import { useState } from "react";
import { GameLevelEnum } from "@/enums";
import { GameBoardSize } from "@/interfaces";
import { useAppDispatch } from "@/redux/hook";
import {
  setGameBoardSize,
  setGameLevel,
  setMineNumber,
} from "@/redux/features";

function Header() {
  const dispatch = useAppDispatch();
  const [popOpen, setPopOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setPopOpen(false);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleLevel = (gameLevel: GameLevelEnum) => {
    let boardSize: GameBoardSize;
    let mineNumber: number;

    switch (gameLevel) {
      case GameLevelEnum.BEGINNER: {
        boardSize = {
          row: 8,
          column: 8,
        };
        mineNumber = 10;
        break;
      }
      case GameLevelEnum.INTERMEDIATE: {
        boardSize = {
          row: 16,
          column: 16,
        };
        mineNumber = 40;
        break;
      }
      case GameLevelEnum.EXPERT: {
        boardSize = {
          row: 32,
          column: 16,
        };
        mineNumber = 100;
        break;
      }
      case GameLevelEnum.CUSTOM: {
        // showModal();
        boardSize = {
          row: 32,
          column: 16,
        };
        mineNumber = 100;
        break;
      }
    }

    dispatch(setGameLevel(gameLevel));
    dispatch(setGameBoardSize(boardSize));
    dispatch(setMineNumber(mineNumber));
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
            <Content onClick={() => handleLevel(GameLevelEnum.BEGINNER)}>
              Beginner
            </Content>
            <Content onClick={() => handleLevel(GameLevelEnum.INTERMEDIATE)}>
              Intermediate
            </Content>
            <Content onClick={() => handleLevel(GameLevelEnum.EXPERT)}>
              Expert
            </Content>
            <Content onClick={() => handleLevel(GameLevelEnum.CUSTOM)}>
              Custom
            </Content>
          </ContentWrap>
        }
        title="Chose Level"
        trigger="click"
        open={popOpen}
        onOpenChange={handleOpenChange}
      >
        <TitleWrap>Game</TitleWrap>
      </Popover>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
      >
        123
      </Modal>
    </Container>
  );
}

export default Header;
