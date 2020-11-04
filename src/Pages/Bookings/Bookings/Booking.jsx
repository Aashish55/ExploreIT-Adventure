import React from "react";
import styled from "styled-components";
import moment from "moment";
import UserInfo from "../../../components/utility/UserInfo";

const Booking = ({ booking, service }) => {
  const bookedServiceInfo = booking.bookingInfo[0].serviceInfo;
  const chosedServiceInfo = service.serviceInfo.find(
    serviceInfo => serviceInfo._id === bookedServiceInfo
  );
  const bookedPriceInfo = booking.bookingInfo[0].price;
  const chosedPriceInfo = service.prices.find(
    price => price._id === bookedPriceInfo
  );

  return (
    <BookingContainer>
      <AdventureDate>
        Date - {moment(new Date(booking.adventureDate)).format("DD/MM/YYYY")}
      </AdventureDate>
      <AdventureDate>{`${moment(chosedServiceInfo.startTime).format(
        "hh:mm A"
      )} - ${moment(chosedServiceInfo.endTime).format(
        "hh:mm A"
      )}`}</AdventureDate>
      <AdventureDate>Day - {chosedServiceInfo.day}</AdventureDate>
      <AdventureDate>Price - {chosedPriceInfo.value}</AdventureDate>
      <AdventureDate>
        Booked For : <UserInfo userId={booking.bookingInfo[0].bookedFor} />{" "}
      </AdventureDate>
    </BookingContainer>
  );
};

const BookingContainer = styled.div`
  font-size: 1.75rem;
  padding: 1rem;
  background-color: white;
  border: 1.5px solid ${({ theme }) => theme.navIconsColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AdventureDate = styled.p`
  margin: 1rem;
`;

export default Booking;
