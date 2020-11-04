import React, { useContext } from "react";
import styled from "styled-components";
import useFetch from "../../../customHooks/useFetch";
import { AuthContext } from "../../../contexts/auth";

const Home = () => {
  const { getAuthInfo } = useContext(AuthContext);

  const authInfo = getAuthInfo();

  const { data, loading, error } = useFetch({
    url: `${process.env.REACT_APP_adventureServerHostName}/api/v1/vendors/${authInfo.dataFromToken.vendorId}/bookings/count`,
    method: "get"
  });

  if (!data || loading || error) {
    return "Loading...";
  }

  const { bookings } = data;

  return (
    <DashboardContainer>
      <BookingCountContainer>
        <BookingCount>
          You have
          <br />
          <BookingValue>{bookings} Bookings</BookingValue>
          <br />
          today
        </BookingCount>
      </BookingCountContainer>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  display: flex;
`;

const BookingCountContainer = styled.div`
  padding: 2rem;
  background-color: white;
  border-radius: 0.5rem;
  border: 2px solid ${({ theme }) => theme.navIconsColor};
`;

const BookingCount = styled.p`
  font-size: 2rem;
`;

const BookingValue = styled.span`
  font-size: 3rem;
  padding: 1rem 0;
  display: inline-block;
  color: ${({ theme }) => theme.bannerColor};
`;

export default Home;
