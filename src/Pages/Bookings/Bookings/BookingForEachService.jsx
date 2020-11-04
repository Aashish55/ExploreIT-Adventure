import React from "react";
import styled from "styled-components";
import moment from "moment";

import useFetch from "../../../customHooks/useFetch";
import PageTitle from "../../../components/utility/PageTitle";
import Booking from "./Booking";

const BookingForEachService = ({ service }) => {
  const { data, loading, error } = useFetch({
    url: `${process.env.REACT_APP_adventureServerHostName}/api/v1/bookings/${service._id}`,
    method: "get"
  });

  if (!data) return "";

  const { bookings } = data;
  return (
    <BookingForEachServiceContainer>
      <PageTitle>{service.adventure.name}</PageTitle>
      <BookingsContainer>
        {bookings.map(booking => (
          <Booking booking={booking} service={service} />
        ))}
      </BookingsContainer>
    </BookingForEachServiceContainer>
  );
};

const BookingForEachServiceContainer = styled.div`
  padding: 4rem 0;
`;

const BookingsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  margin: 2rem 0;
`;

export default BookingForEachService;
