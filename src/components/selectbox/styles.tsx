import styled from "styled-components";

type StyledButtonType = {
  color?: string;
};

export const StyledSelectBox = styled.select<StyledButtonType>`
  padding: 5px 45px;
  border: none;
  margin: 0 5px;
  border-radius: 10px;
  font-size: 1rem;
`;
