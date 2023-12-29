import { InputNumber, Modal, Popover } from "antd";
import {
  Container,
  Content,
  ContentWrap,
  InputContainer,
  ModalBody,
  TitleWrap,
} from "./styles";
import { useState } from "react";
import { GameLevelEnum } from "@/enums";
import { GameOption } from "@/interfaces";
import { useAppDispatch } from "@/redux/hook";
import { setGameOption } from "@/redux/features";

function Header() {
  const dispatch = useAppDispatch();
  const [popOpen, setPopOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customOption, setCustomOption] = useState<GameOption>({
    gameLevel: GameLevelEnum.CUSTOM,
    gameBoardSize: {
      row: 8,
      column: 8,
    },
    mineNumber: 10,
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    dispatch(setGameOption(customOption));
    setPopOpen(false);
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
        width={400}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
      >
        <ModalBody>
          <InputContainer>
            Game Height :
            <InputNumber
              value={customOption.gameBoardSize.column}
              min={8}
              max={100}
              onChange={(value: string | number | null) => {
                setCustomOption({
                  ...customOption,
                  gameBoardSize: {
                    row: customOption.gameBoardSize.row,
                    column: Math.floor(value as number),
                  },
                });
              }}
            />
          </InputContainer>
          <InputContainer>
            Game Width :
            <InputNumber
              value={customOption.gameBoardSize.row}
              min={8}
              max={100}
              onChange={(value: string | number | null) => {
                setCustomOption({
                  ...customOption,
                  gameBoardSize: {
                    row: Math.floor(value as number),
                    column: customOption.gameBoardSize.column,
                  },
                });
              }}
            />
          </InputContainer>
          <InputContainer>
            Number Of Mines :
            <InputNumber
              value={customOption.mineNumber}
              min={1}
              max={Math.floor(
                (customOption.gameBoardSize.column *
                  customOption.gameBoardSize.row) /
                  3
              )}
              onChange={(value: string | number | null) => {
                setCustomOption({
                  ...customOption,
                  mineNumber: value as number,
                });
              }}
            />
          </InputContainer>
        </ModalBody>
      </Modal>
    </Container>
  );
}

export default Header;
