import React from "react";
import styled from "styled-components";

const Label = ({ uuid, label, style = {}, ...otherProps }) => {
  return (
    <LabelJSX style={style} htmlFor={uuid} {...otherProps}>
      {label}
    </LabelJSX>
  );
};

export default Label;

const LabelJSX = styled.label`
  border-bottom: 0.1rem solid ${({ theme }) => theme.textColorBlack};
  align-self: flex-start;
  font-size: 2rem;
  color: ${({ theme }) => theme.black};
  margin-bottom: 0.4rem;
  margin-left: 1rem;
`;
