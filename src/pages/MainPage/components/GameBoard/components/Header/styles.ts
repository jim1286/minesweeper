import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  background-color: lightgray;
  gap: 5px;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: 2px solid gray;
  border-radius: 5px;
  cursor: pointer;
`;

export const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 30px;
  background: black;
  color: white;
`;
