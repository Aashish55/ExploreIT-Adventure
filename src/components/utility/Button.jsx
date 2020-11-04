import React from "react";
import styled from "styled-components";

const Button = ({ text, type, onClick, ...otherProps }) => {
  return (
    <ButtonJSX onClick={onClick} type={type} {...otherProps}>
      {text}
    </ButtonJSX>
  );
};

const ButtonJSX = styled.button`
  border: none;
  font-family: inherit;
  border-radius: 0.5rem;
  outline: none;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-0.3rem);
  }

  &:active {
    transform: translateY(-0);
  }

  ${({ small }) =>
    small
      ? `
      font-size: 1.25rem;
      padding: .5rem;
      `
      : `
      font-size: 2rem;
      padding: 1rem;
      `}

  ${({ reverse, theme }) =>
    reverse
      ? `
      color: ${({ theme }) => theme.bannerColor};
      background-color: transparent;
      border-bottom: 1px solid ${theme.bannerColor};
      padding-bottom: .2rem;
      border-radius: 0rem;
  `
      : `
      color: ${theme.white};
      background-color: ${theme.bannerColor};
      `}

  &:focus {
    box-shadow: 0.5rem 0px 2rem -1rem ${({ theme }) => theme.textColorBlack};
    transform: translateY(-0.3rem);
  }
`;

export default Button;
