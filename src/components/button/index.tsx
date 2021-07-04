import React, { ReactElement } from "react";
import { StyledButton } from "./styles";

interface Props {
  color?: string;
  text?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function Button({ color, text, disabled, onClick }: Props): ReactElement {
  return (
    <StyledButton disabled={disabled} color={color} onClick={onClick}>
      {text}
    </StyledButton>
  );
}

export default Button;
