import React, { ReactElement } from "react";
import { StyledSelectBox } from "./styles";

interface Option {
  value: any;
  text: string;
}

interface Props {
  options: Option[];
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  value?: any;
}

function SelectBox({ options, onChange, value }: Props): ReactElement {
  return (
    <StyledSelectBox value={value} onChange={onChange}>
      {options.map((option, k) => (
        <option key={k} value={option.value}>
          {option.text}
        </option>
      ))}
    </StyledSelectBox>
  );
}

export default SelectBox;
