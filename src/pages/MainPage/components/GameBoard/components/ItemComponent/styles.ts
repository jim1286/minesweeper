import styled from "styled-components";

interface MineNumberProps {
  mineNumber?: number;
  isChecked?: boolean;
  isMine?: boolean;
}

export const Container = styled.div<MineNumberProps>`
  width: 30px;
  height: 30px;
  background-color: ${(props) =>
    props.isMine ? "red" : props.isChecked ? "#fff" : "grey"};
  border: 1px solid lightgrey;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  cursor: pointer;

  color: ${(props) => {
    switch (props.mineNumber) {
      case 1:
        return "blue";
      case 2:
        return "green";
      case 3:
        return "red";
      case 4:
        return "purple";
      default:
        return "black";
    }
  }};
`;
