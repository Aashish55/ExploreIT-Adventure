import styled from "styled-components";

export default styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr;
  max-height: 100%;
  min-height: 100%;

  border-top-left-radius: 4rem;
  overflow: hidden;

  ${({ smallNavigationBar }) =>
    smallNavigationBar
      ? `
  height: calc(100vh - 5rem - 40px);
  `
      : `
  height: calc(100vh - 5rem - 80px);
  `}

  transition: height .2s;
`;
