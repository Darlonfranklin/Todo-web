import styled from "styled-components";

interface ContainerProps {
  actived: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 370px;
  height: 60px;
  background: ${(props) => (props.actived ? "#ee6b26" : "#20295f")};
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  img {
    width: 25px;
    height: 25px;
  }

  span {
    color: #fff;
    font-weight: bold;
    align-self: flex-end;
    font-size: 18px;
  }

  &:hover {
    background: #ee6b26;
  }
`;
