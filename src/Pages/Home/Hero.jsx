import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import HeroImage from "./../../images/adventure.jpg";
import LinkButton from "../../components/utility/LinkButton";
import { AuthContext } from "../../contexts/auth";

const Hero = () => {
  const { getAuthInfo } = useContext(AuthContext);

  const authData = getAuthInfo();

  return (
    <HeroContainer
      animate={{
        backgroundPositionX: ["-10rem", "0rem"],
        backgroundPositionY: ["-20rem", "-15rem"]
      }}
      transition={{
        yoyo: Infinity,
        duration: 20,
        ease: "linear"
      }}
    >
      <HeroTitle
        animate={{
          backgroundPosition: ["0%", "100%"]
        }}
        transition={{
          yoyo: Infinity,
          duration: 5,
          ease: "linear"
        }}
      >
        Welcome to ExploreIT Adventures
      </HeroTitle>
      {authData ? (
        <LinkButton
          to="/dashboard"
          style={{ marginTop: "6rem" }}
          text="Go to Dashboard"
        />
      ) : (
        <LinkButton
          to="/login"
          style={{ marginTop: "6rem" }}
          text="Start Now"
        />
      )}
    </HeroContainer>
  );
};

const HeroContainer = styled(motion.div)`
  background-image: url(${HeroImage});
  height: calc(100vh - 5rem - 80px);
  border-top-left-radius: 4rem;
  background-size: calc(100% + 10rem);
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 5rem;
  background-image: linear-gradient(
    to right,
    ${({ theme }) => theme.bannerColorDark},
    ${({ theme }) => theme.bannerColor},
    ${({ theme }) => theme.bannerColorDark}
  );
  background-size: 200%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-top: 5rem;
`;

export default Hero;
