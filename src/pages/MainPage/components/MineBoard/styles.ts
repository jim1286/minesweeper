import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #bdbdbd;
  border: 1px solid lightgrey;
  border-radius: 10px;
`;

export const MineContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MineWrap = styled.div`
  display: flex;
`;

export const MineItem = styled.div`
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
`;
