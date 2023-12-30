import { Modal, InputNumber } from "antd";
import { ModalBody, InputContainer } from "./styles";
import { GameLevelEnum } from "@/enums";
import { GameOption } from "@/interfaces";
import { useState } from "react";

interface Props {
  isModalOpen: boolean;
  onOk: (customOption: GameOption) => void;
  onCancel: () => void;
}

function CustomModal({ isModalOpen, onOk, onCancel }: Props) {
  const [customOption, setCustomOption] = useState<GameOption>({
    gameLevel: GameLevelEnum.CUSTOM,
    gameBoardSize: {
      row: 8,
      column: 8,
    },
    mineNumber: 10,
  });

  return (
    <Modal
      width={400}
      open={isModalOpen}
      onOk={() => onOk(customOption)}
      onCancel={onCancel}
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
  );
}

export default CustomModal;
