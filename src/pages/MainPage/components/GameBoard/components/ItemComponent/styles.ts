import styled from "styled-components";

interface MineNumberProps {
  checked: boolean;
  minNumber?: number;
}

export const Container = styled.div<MineNumberProps>`
  width: 30px;
  height: 30px;
  background-color: #ccc;
  border: 1px solid #fff;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  cursor: pointer;

  color: ${(props) => {
    switch (props.minNumber) {
      case 1:
        return "#007BD9";
      case 2:
        return "#09B219";
      case 3:
        return "#FB0B0D";
      case 4:
        return "#223DAA";
      default:
        return "black";
    }
  }};
`;
