import React, { useCallback, createContext, useState } from "react";
import { parseJwt } from "./../utility/parseJwt";

export const AuthContext = createContext({});

export const AuthContextConsumer = AuthContext.Consumer;

const authLocalStorage = localStorage.getItem("auth");
const authToBeSet =
  authLocalStorage !== null || authLocalStorage !== undefined
    ? JSON.parse(authLocalStorage)
    : null;

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(authToBeSet);

  const getAuthInfo = useCallback(() => auth, [auth]);

  const doLogin = useCallback(data => {
    let dataToBeSet = data;

    dataToBeSet.dataFromToken.vendorId = data.dataFromToken.isAdmin
      ? data.dataFromToken._id
      : data.dataFromToken.vendor._id;
    localStorage.setItem("auth", JSON.stringify(dataToBeSet));

    setAuth(dataToBeSet);
  }, []);

  const switchVendor = useCallback(
    newToken => {
      const newTokenData = parseJwt(newToken);
      let dataToBeSet = {
        ...auth,
        token: newToken,
        dataFromToken: newTokenData
      };
      dataToBeSet.dataFromToken.vendorId = dataToBeSet.dataFromToken.isAdmin
        ? dataToBeSet.dataFromToken._id
        : dataToBeSet.dataFromToken.vendor._id;
      localStorage.setItem("auth", JSON.stringify(dataToBeSet));
      setAuth(dataToBeSet);
    },
    [auth]
  );

  const doLogOut = useCallback(() => {
    localStorage.removeItem("auth");
    setAuth(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ doLogOut, doLogin, getAuthInfo, switchVendor }}
    >
      {children}
    </AuthContext.Provider>
  );
};
