import React, { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { Redirect } from "@reach/router";

const NotAuthenticatedRoute = ({ as: Component, ...props }) => {
  const { getAuthInfo } = useContext(AuthContext);

  const authInfo = getAuthInfo();

  if (authInfo && authInfo.token) {
    return <Redirect to="/" noThrow />;
  } else {
    return <Component {...props} />;
  }
};

export default NotAuthenticatedRoute;
