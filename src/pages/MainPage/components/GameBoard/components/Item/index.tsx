import { nanoid } from "@reduxjs/toolkit";
import { Container } from "./styles";

interface Props {
  rowIndex: number;
  columnIndex: number;
  onClick: (rowIndex: number, columnIndex: number) => void;
}

function Item({ rowIndex, columnIndex, onClick }: Props) {
  return (
    <Container
      key={nanoid()}
      onClick={() => onClick(rowIndex, columnIndex)}
    ></Container>
  );
}

export default Item;
