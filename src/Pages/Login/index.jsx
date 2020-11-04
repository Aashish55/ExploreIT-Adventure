import React, { useState, useContext } from "react";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";

import VendorSignUp from "./VendorSignUp";
import InitialLogin from "./InitialLogin";
import { AuthContext } from "../../contexts/auth";

const Login = () => {
  const [showVendorSignUp, setShowVendorSignUp] = useState(false);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const { doLogin } = useContext(AuthContext);

  const handleInitialLoginSuccessWithOutVendor = async loggedInData => {
    setLoggedInUserData(loggedInData);
    setShowVendorSignUp(true);
  };

  const handleVendorSignUpSuccess = async newData => {
    doLogin({ ...loggedInUserData, ...newData });
  };

  return (
    <LoginContainer>
      <TopViewPort>
        <AnimatePresence>
          {showVendorSignUp && (
            <VendorSignUp
              doLogin={doLogin}
              setShowVendorSignUp={setShowVendorSignUp}
              setLoggedInUserData={setLoggedInUserData}
              userData={loggedInUserData}
              onSignUpSuccess={handleVendorSignUpSuccess}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!showVendorSignUp && (
            <InitialLogin
              doLogin={doLogin}
              onLoginSuccess={handleInitialLoginSuccessWithOutVendor}
            />
          )}
        </AnimatePresence>
      </TopViewPort>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  margin-top: 5rem;
`;

const TopViewPort = styled.div`
  position: relative;
  display: flex;
  height: calc(100vh - 19rem);
  overflow: hidden;
`;

export default Login;
