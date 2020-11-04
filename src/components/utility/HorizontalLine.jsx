import React from "react";
import styled from "styled-components";

const HorizontalLine = () => {
  return <HorizontalLineJSX />;
};

const HorizontalLineJSX = styled.hr`
  height: 0;
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.textColorBlack};
`;

export default HorizontalLine;
