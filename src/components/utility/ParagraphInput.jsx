import React from "react";
import styled from "styled-components";
import Label from "./Label";

const TextInput = ({
  value,
  label,
  onChange,
  placeholder,
  showLabel,
  ...otherProps
}) => {
  const uuid = Math.random();
  return (
    <InputContainer>
      {showLabel ? <Label uuid={uuid} label={label} /> : null}
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        id={uuid}
        {...otherProps}
      ></Input>
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  min-width: 40rem;

  margin: 2rem 0;
`;

const Input = styled.textarea`
  border: none;
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: none;
  outline: none;
  font-family: inherit;
  width: 100%;
  height: 9rem;
  resize: none;
  font-size: 2rem;
  padding: 1rem;
  border-bottom: 0.15rem solid ${({ theme }) => theme.navIconsColor};

  &::placeholder {
    font-family: Lato, sans-serif;
  }

  &:focus {
    box-shadow: 0.5rem 0px 2rem -1rem ${({ theme }) => theme.textColorBlack};
  }
`;

export default TextInput;
