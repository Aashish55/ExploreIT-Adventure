import styled from "styled-components";

export default styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;

  padding: 4rem;

  padding-right: 7rem;

  background-color: ${({ theme }) => theme.lightestBlue};
`;
