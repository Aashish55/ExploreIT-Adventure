import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import axios from "axios";

import { parseJwt } from "../../utility/parseJwt";

import TextInput from "../../components/utility/TextInput";
import Button from "../../components/utility/Button";

const InitialLogin = ({ onLoginSuccess, doLogin }) => {
  const [user, setUser] = useState({
    loginInfo: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_adventureServerHostName}/api/v1/vendors/login`,
        {
          ...user
        }
      );

      if (data.token) {
        doLogin({
          dataFromExploreItToken: parseJwt(data.exploreItToken),
          dataFromToken: parseJwt(data.token),
          token: data.token,
          exploreItToken: data.exploreItToken
        });
      } else {
        onLoginSuccess({
          exploreItToken: data.exploreItToken,
          dataFromExploreItToken: parseJwt(data.exploreItToken)
        });
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      try {
        if (err) {
          if (err.response) {
            if (err.response.data) {
              if (err.response.data.message === "Provide Valid Info") {
                console.log("User doesn't exist");
                // Move to register page of exploreIt.
                // TODO :
              } else if (err.response.data.message === "Wrong Password") {
                // Show in UI,
                console.log("Wrong Password");
              } else {
                throw new Error("Some Unknown Error Occurred");
              }
            }
          } else {
            throw new Error("Some Unknown Error Occurred");
          }
        } else {
          throw new Error("Some Unknown Error Occurred");
        }
      } catch (err) {
        // Display Some Error Message Here
        // Show in UI
      }
    }
  };

  return (
    <InitialLoginContainer
      initial={{ left: "150vw" }}
      animate={{ left: "50%" }}
      exit={{ left: "150vw" }}
      transitionEnd={{ display: "none" }}
    >
      <LoginPageTitle>One Account. All of ExploreIT.</LoginPageTitle>
      <FormContainer onSubmit={handleSubmit}>
        <FormTitle>Login Now :</FormTitle>
        <TextInput
          value={user.loginInfo}
          placeholder="Email / Phone Number / Username"
          label="Email / Phone Number / Username"
          onChange={e => setUser({ ...user, loginInfo: e.target.value })}
        />
        <TextInput
          value={user.password}
          type="password"
          placeholder="Password"
          label="Password"
          onChange={e => setUser({ ...user, password: e.target.value })}
        />
        {loading ? "Spinner" : <Button onClick={handleSubmit} text="Login" />}
      </FormContainer>
    </InitialLoginContainer>
  );
};

const FormContainer = styled.form``;

const FormTitle = styled.h2`
  font-size: 3rem;
  margin: 1rem 0;
  display: inline-block;
  border-offset: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.textColorBlack};
`;

const InitialLoginContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  transform: translateX(-50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  min-height: 100%;

  padding: 2rem 0;
  margin: 2rem 0;
`;

const LoginPageTitle = styled.h1`
  text-align: center;
  font-size: 4rem;
  color: ${({ theme }) => theme.bannerColorDark};

  border-bottom: 2px solid ${({ theme }) => theme.bannerColorDark};
`;

export default InitialLogin;
