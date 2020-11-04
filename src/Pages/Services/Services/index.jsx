import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../../contexts/auth";
import useFetch from "../../../customHooks/useFetch";
import moment from "moment";

const Services = () => {
  const { getAuthInfo } = useContext(AuthContext);
  const authInfo = getAuthInfo();

  const { data, loading, error } = useFetch({
    url: `${process.env.REACT_APP_adventureServerHostName}/api/v1/services/${authInfo.dataFromToken.vendorId}`,
    method: "get"
  });

  if (!data) {
    return "Loading...";
  }

  const { services } = data;
  return (
    <ServicesContainer>
      {services.map((service, index) => (
        <EachService key={"eachserv" + index}>
          <p> Adventure : {service.adventure.name}</p>
          <p>Description: {service.description}</p>
          <p>Price: {service.prices[0].value}</p>
          <p>Difficulty: {service.difficulty}</p>
          {service.serviceInfo.map(eachServiceInfo => (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr repeat(3, 1fr)"
              }}
            >
              <p>
                Time :
                {`${moment(eachServiceInfo.startTime).format(
                  "hh:mm A"
                )} - ${moment(eachServiceInfo.endTime).format("hh:mm A")}`}
              </p>
              <p> Max Clients: {eachServiceInfo.maximumClientsToServe}</p>
              <p> Day: {eachServiceInfo.day}</p>
            </div>
          ))}
        </EachService>
      ))}
    </ServicesContainer>
  );
};

const ServicesContainer = styled.div``;

const EachService = styled.div`
  margin: 2rem 0;
  font-size: 2rem;
  line-height: 2;
`;

export default Services;
