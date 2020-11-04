import React, { useContext } from "react";
import useFetch from "../../../customHooks/useFetch";
import { AuthContext } from "../../../contexts/auth";
import BookingForEachService from "./BookingForEachService";

const Bookings = () => {
  const { getAuthInfo } = useContext(AuthContext);
  const authInfo = getAuthInfo();

  const { data, loading, error } = useFetch({
    url: `${process.env.REACT_APP_adventureServerHostName}/api/v1/services/${authInfo.dataFromToken.vendorId}`,
    method: "get"
  });

  if (!data) return "";

  return data.services.map(service => (
    <BookingForEachService service={service} authInfo={authInfo} />
  ));
};

export default Bookings;
