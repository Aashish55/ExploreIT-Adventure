import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "@reach/router";
import { AnimatePresence } from "framer-motion";
import DropDown from "./DropDown";
import useLazyFetch from "./../../customHooks/useLazyFetch";

const User = ({ authInfo, doLogOut }) => {
  const [showDropDown, setShowDropDown] = useState(false);

  const { data, loading, error, fetch: getVendors } = useLazyFetch({
    method: "get",
    url: `${
      process.env.REACT_APP_adventureServerHostName
    }/api/v1/vendors/${authInfo && authInfo.dataFromExploreItToken._id}`
  });

  useEffect(() => {
    if (authInfo && !data) {
      getVendors();
    }
  }, [authInfo]);

  if (authInfo) {
    return (
      <UserContainer
        onMouseEnter={() => setShowDropDown(true)}
        onMouseLeave={() => setShowDropDown(false)}
      >
        <div>
          <Text>Hey, {authInfo.dataFromExploreItToken.name.split(" ")[0]}</Text>
          <Text>
            {authInfo.dataFromToken.isAdmin
              ? `Admin | ${authInfo.dataFromToken.name}`
              : `${authInfo.dataFromToken.title} | ${authInfo.dataFromToken.vendor.name}`}
          </Text>
        </div>
        <ImageContainer>
          <Image src={authInfo.dataFromExploreItToken.photo} />
        </ImageContainer>
        <AnimatePresence>
          {showDropDown && (
            <DropDown
              doLogOut={() => {
                setShowDropDown(false);
                doLogOut();
              }}
              data={data}
            />
          )}
        </AnimatePresence>
      </UserContainer>
    );
  } else {
    return (
      <UserContainer>
        <div>
          <Text>Hey, there</Text>
        </div>
        <Link to="/login">
          <ImageContainer>
            <NoImage></NoImage>
          </ImageContainer>
        </Link>
      </UserContainer>
    );
  }
};

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.textColorBlack};
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: 1rem;
  text-align: right;
  padding: 0.2rem 0;
`;

const ImageContainer = styled.figure`
  overflow: hidden;
  width: 5rem;
  height: 5rem;
  border-radius: 2rem;
  cursor: pointer;
`;

const NoImage = styled.div`
  background-color: ${({ theme }) => theme.textColorBlack};
  width: 100%;
  height: 100%;
  position: relative;

  &::after {
    display: flex;
    justify-content: center;
    align-items: center;
    content: "Login";
    width: 50%;
    height: 50%;
    border-radius: 50%;
    color: ${({ theme }) => theme.white};
    opacity: 0.8;
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translateY(-50%) translateX(-50%);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%:
  object-fit: cover;
`;

export default User;
