import React, { useContext, useReducer } from "react";
import moment from "moment";
import axios from "axios";

import useFetch from "../../../customHooks/useFetch";
import { AuthContext } from "../../../contexts/auth";
import styled from "styled-components";
import PageTitle from "../../../components/utility/PageTitle";
import Datepicker from "../../../components/utility/Datepicker";
import Label from "../../../components/utility/Label";
import getDayByDayIndex from "../../../components/utility/getDayByDayIndex";
import SearchUser from "../../../components/utility/SearchUser";
import Button from "../../../components/utility/Button";

const NewBooking = () => {
  const { getAuthInfo } = useContext(AuthContext);
  const [state, setState] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "SERVICE":
          return {
            ...state,
            service: action.payload,
            bookingInfo: {
              bookedFor: [],
              serviceInfo: null,
              price: null
            }
          };
        case "DATE":
          return {
            ...state,
            adventureDate: action.payload,
            bookingInfo: {
              bookedFor: [],
              serviceInfo: null,
              price: null
            }
          };
        case "SERVICE_INFO":
          return {
            ...state,
            bookingInfo: { ...state.bookingInfo, serviceInfo: action.payload }
          };
        case "PRICE":
          return {
            ...state,
            bookingInfo: { ...state.bookingInfo, price: action.payload }
          };
        case "BOOKED_FOR":
          return {
            ...state,
            bookingInfo: { ...state.bookingInfo, bookedFor: action.payload }
          };
        case "RESET":
          return {
            service: null,
            bookingInfo: {
              bookedFor: [],
              serviceInfo: null,
              price: null
            },
            adventureDate: [new Date()]
          };
        default:
          return state;
      }
    },
    {
      service: null,
      bookingInfo: {
        bookedFor: [],
        serviceInfo: null,
        price: null
      },
      adventureDate: [new Date()]
    }
  );

  const authInfo = getAuthInfo();

  const { data: servicesData, loading, error } = useFetch({
    url: `${process.env.REACT_APP_adventureServerHostName}/api/v1/services/${authInfo.dataFromToken.vendorId}`,
    method: "get"
  });

  const handleNewBooking = async e => {
    e.preventDefault();
    console.log(state);
    if (state.bookingInfo.bookedFor.length === 0) {
      alert("Choose username");
      return;
    }

    if (!state.bookingInfo.serviceInfo) {
      alert("Choose time");
      return;
    }

    let finalRequestBody = { ...state };
    finalRequestBody.bookingInfo = [
      {
        ...finalRequestBody.bookingInfo,
        bookedFor: finalRequestBody.bookingInfo.bookedFor[0]._id
      }
    ];

    finalRequestBody.bookedBy = authInfo.dataFromExploreItToken._id;

    await axios.post(
      `${process.env.REACT_APP_adventureServerHostName}/api/v1/bookings`,
      finalRequestBody
    );
    setState({ type: "RESET" });
  };

  if (!servicesData) return "Loading...";

  const { services } = servicesData;
  const day = getDayByDayIndex(state.adventureDate[0].getDay());

  const chosedService = services.find(
    eachServ => eachServ._id === state.service
  );
  const servicesInfoOnThatDay = chosedService
    ? chosedService.serviceInfo.filter(eachInfo => eachInfo.day === day)
    : [];

  return (
    <BookingContainer>
      <PageTitle style={{ textAlign: "center", marginBottom: "1rem" }}>
        New Booking
      </PageTitle>
      <FormContainer onSubmit={handleNewBooking}>
        <AdventureSelectionContainer>
          {services.map(service => (
            <AdventureSelection
              key={service._id}
              selected={service._id === state.service}
              onClick={() =>
                setState({ type: "SERVICE", payload: service._id })
              }
            >
              {service.adventure.name}
            </AdventureSelection>
          ))}
        </AdventureSelectionContainer>
        <Datepicker
          minDate={new Date()}
          maxDate={moment(new Date())
            .add(7, "days")
            .toDate()}
          value={state.adventureDate}
          onChange={date => {
            setState({ type: "DATE", payload: date });
          }}
          label="Adventure Date"
          containerStyle={{ width: "20rem", margin: "2rem 0" }}
        />
        {servicesInfoOnThatDay.length > 0 && (
          <React.Fragment>
            <Label
              label="Choose adventure time"
              style={{ alignSelf: "center", marginBottom: "1rem" }}
            />
            <TimeSelectionContainer>
              {servicesInfoOnThatDay.map(serviceInfo => {
                return (
                  <TimeSelection
                    selected={state.bookingInfo.serviceInfo === serviceInfo._id}
                    onClick={() => {
                      setState({
                        type: "SERVICE_INFO",
                        payload: serviceInfo._id
                      });

                      setState({
                        type: "PRICE",
                        payload: chosedService.prices.find(
                          price => price.isCurrent
                        )._id
                      });
                    }}
                  >
                    {`${moment(serviceInfo.startTime).format(
                      "hh:mm A"
                    )} - ${moment(serviceInfo.endTime).format("hh:mm A")}`}
                  </TimeSelection>
                );
              })}
            </TimeSelectionContainer>

            <TimeSelectionContainer>
              <TimeSelection
                selected={
                  state.bookingInfo.price ===
                  chosedService.prices.find(price => price.isCurrent)._id
                }
              >
                Price:{" "}
                {chosedService.prices.find(price => price.isCurrent).value}
              </TimeSelection>
            </TimeSelectionContainer>
            <SearchUser
              value={state.bookingInfo.bookedFor}
              onChange={value => {
                setState({
                  type: "BOOKED_FOR",
                  payload: value
                });
              }}
            />
            <Button
              text="Book Now!"
              style={{
                position: "absolute",
                left: "50%",
                bottom: 0,
                transform: "translateX(-50%)"
              }}
            />
          </React.Fragment>
        )}
      </FormContainer>
    </BookingContainer>
  );
};

const BookingContainer = styled.div``;

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  padding-bottom: 8rem;
`;

const AdventureSelectionContainer = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
`;

const AdventureSelection = styled.li`
  list-style: none;
  margin: 0 1rem;
  padding: 1rem;
  border: none;
  border-radius: 50px;
  box-shadow: none;
  outline: none;
  ${({ selected, theme }) =>
    selected
      ? `
  background-color: ${theme.bannerColor};
  color: ${theme.white};
  border: 1px solid transparent;
  `
      : `
  background-color: transparent;
  color: ${theme.bannerColor};
  border: 1px solid ${theme.bannerColor};
  `}

  &:focus {
    box-shadow: 0.5rem 0px 2rem -1rem ${({ theme }) => theme.textColorBlack};
  }
`;

const TimeSelectionContainer = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin: 1rem 0;
`;

const TimeSelection = styled.li`
  list-style: none;
  margin: 0 1rem;
  padding: 0.75rem;
  border: none;
  border-radius: 50px;
  box-shadow: none;
  outline: none;
  ${({ selected, theme }) =>
    selected
      ? `
  background-color: ${theme.bannerColor};
  color: ${theme.white};
  border: 1px solid transparent;
  `
      : `
  background-color: transparent;
  color: ${theme.bannerColor};
  border: 1px solid ${theme.bannerColor};
  `}

  &:focus {
    box-shadow: 0.5rem 0px 2rem -1rem ${({ theme }) => theme.textColorBlack};
  }
`;

const PriceContainer = styled.div`
  margin: 1rem 0;
`;

export default NewBooking;
