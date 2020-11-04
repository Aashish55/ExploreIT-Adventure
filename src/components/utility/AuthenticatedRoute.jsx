import React, { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { Redirect } from "@reach/router";

const AuthenticatedRoute = ({ as: Component, ...props }) => {
  const { getAuthInfo } = useContext(AuthContext);

  const authInfo = getAuthInfo();

  if (authInfo && authInfo.token) {
    return <Component {...props} />;
  } else {
    return <Redirect to="/login" noThrow />;
  }
};

export default AuthenticatedRoute;
