import React, { useEffect, createContext, useContext } from "react";

import { AuthContext } from "./auth";
import useLazyFetch from "../customHooks/useLazyFetch";

export const StaffContext = createContext({});

export const StaffContextConsumer = StaffContext.Consumer;

export const StaffContextProvider = ({ children }) => {
  const { getAuthInfo } = useContext(AuthContext);

  const authInfo = getAuthInfo();

  const { fetch: getStaffs, loading, data, clearData } = useLazyFetch({
    method: "get",
    url: `${process.env.REACT_APP_adventureServerHostName}/api/v1/vendors/${
      authInfo ? authInfo.dataFromToken.vendorId : ""
    }/staffs`
  });

  useEffect(() => {
    if (!authInfo) {
      clearData(null);
    }
  }, [authInfo, clearData]);

  useEffect(() => {
    if (authInfo) {
      getStaffs();
    }
  }, [authInfo]);

  return (
    <StaffContext.Provider value={{ staffs: data, getStaffs, loading }}>
      {children}
    </StaffContext.Provider>
  );
};
