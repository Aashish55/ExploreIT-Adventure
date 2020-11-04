import React from "react";
import styled from "styled-components";
import Hero from "./Hero";

const Home = () => {
  return (
    <HomeContainer>
      <Hero />
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  padding-right: 3rem;
  overflow-y: scroll;
`;

export default Home;
