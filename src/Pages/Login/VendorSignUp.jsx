import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import axios from "axios";

import TextInput from "../../components/utility/TextInput";
import ParagraphInput from "../../components/utility/ParagraphInput";
import Button from "../../components/utility/Button";
import { parseJwt } from "../../utility/parseJwt";

const VendorSignUp = ({
  userData,
  setShowVendorSignUp,
  setLoggedInUserData,
  onSignUpSuccess
}) => {
  const [vendor, setVendor] = useState({});
  const [loading, setLoading] = useState(false);

  const goBack = () => {
    // Move to login page.
    setShowVendorSignUp(false);
    setLoggedInUserData(null);
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();

      setLoading(true);

      const { data } = await axios.post(
        `${process.env.REACT_APP_adventureServerHostName}/api/v1/vendors`,
        { ...vendor },
        {
          headers: {
            exploreittoken: userData.exploreItToken
          }
        }
      );
      setLoading(true);
      const { token } = data;
      const dataFromToken = parseJwt(token);
      // Set token and display message;
      onSignUpSuccess({ token, dataFromToken });
      // Set global auth context;
    } catch (err) {
      // Show some error message here.
      setLoading(false);
    }
  };

  return (
    <VendorSignUpContainer
      initial={{ left: "150vw" }}
      animate={{ left: "50%" }}
      exit={{ left: "150vw" }}
    >
      <UserInfoContainer>
        <WelcomeMessage>
          Hello, {userData.dataFromExploreItToken.name}
        </WelcomeMessage>
        <Photo
          src={userData.dataFromExploreItToken.photo}
          alt={userData.dataFromExploreItToken.name}
        />
        <ActionsWrapper>
          <p style={{ marginRight: "1rem", fontSize: "1.5rem" }}>Not You ? </p>{" "}
          <Button onClick={goBack} small reverse text="Go Back" />
        </ActionsWrapper>
      </UserInfoContainer>
      <VendorSignUpFormContainer>
        <VendorSignUpPageTitle>
          Join your business with us.
        </VendorSignUpPageTitle>
        <VendorSignUpForm onSubmit={handleSubmit}>
          <TextInput
            value={vendor.name}
            placeholder="Name of venture"
            label="Name of Venture"
            onChange={e => setVendor({ ...vendor, name: e.target.value })}
          />

          <ParagraphInput
            value={vendor.description}
            placeholder="Description of venture"
            label="Description of Venture"
            onChange={e =>
              setVendor({ ...vendor, description: e.target.value })
            }
          />

          {loading ? (
            "Spinner"
          ) : (
            <Button onClick={handleSubmit} text="Sign Up" />
          )}
        </VendorSignUpForm>
      </VendorSignUpFormContainer>
    </VendorSignUpContainer>
  );
};

const VendorSignUpContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  min-height: 100%;
  padding: 2rem 0;
  margin: 2rem 0;

  display: flex;
  align-items: center;
  width: 80%;
  margin: 0 auto;
`;

const UserInfoContainer = styled.div`
  flex: 1.3;
  margin-right: 1rem;
  padding-right: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: stretch;

  border-right: 1px solid ${({ theme }) => theme.textColorBlack};
`;

const WelcomeMessage = styled.h3`
  color: ${({ theme }) => theme.textColorBlack};
  font-size: 2rem;
  font-weight: bold;
`;

const Photo = styled.img`
  overflow: hidden;
  width: 8rem;
  height: 8rem;
  border-radius: 2rem;
  object-fit: cover;
  margin: 3rem 0;
`;

const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VendorSignUpFormContainer = styled.div`
  flex: 3
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  align-self: stretch;
    
  padding: 2rem 0;
  margin: 2rem 0;
`;

const VendorSignUpForm = styled.form``;

const VendorSignUpPageTitle = styled.h1`
  text-align: center;
  font-size: 4rem;
  color: ${({ theme }) => theme.bannerColorDark};

  border-bottom: 2px solid ${({ theme }) => theme.bannerColorDark};
`;

const FormTitle = styled.h2`
  font-size: 3rem;
  margin: 1rem 0;
  display: inline-block;
  border-offset: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.textColorBlack};
`;

export default VendorSignUp;
