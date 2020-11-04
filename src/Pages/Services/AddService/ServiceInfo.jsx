import React from "react";
import styled from "styled-components";

import TextInput from "./../../../components/utility/TextInput";
import TimePicker from "./../../../components/utility/TimePicker";
import Select from "./../../../components/utility/Select";
import Button from "./../../../components/utility/Button";

const ServiceInfo = ({ serviceInfo, setService }) => {
  console.log(serviceInfo);
  console.log(serviceInfo);
  return (
    <ServiceInfoContainer>
      <EachServiceInfo style={{ margin: "1rem 0" }}>
        <TableHeader>Start Time</TableHeader>
        <TableHeader>End Time</TableHeader>
        <TableHeader>Day</TableHeader>
        <TableHeader>Maximum Clients To Serve</TableHeader>
      </EachServiceInfo>
      {serviceInfo.map((eachServiceInfo, index) => (
        <EachServiceInfo key={"eachServiceInfo" + index}>
          <TimePicker
            placeholder="Serice Start Time"
            value={eachServiceInfo.startTime}
            onChange={value =>
              setService({
                type: "SINGLE_VALUE_SERVICE_INFO",
                key: "startTime",
                index,
                payload: value
              })
            }
          />
          <TimePicker
            value={eachServiceInfo.endTime}
            placeholder="Service End Time"
            onChange={value =>
              setService({
                type: "SINGLE_VALUE_SERVICE_INFO",
                key: "endTime",
                index,
                payload: value
              })
            }
          />
          <Select
            options={[
              { label: "Sunday", id: "SUNDAY" },
              { label: "Monday", id: "MONDAY" },
              { label: "Tuesday", id: "TUESDAY" },
              { label: "Wednesday", id: "WEDNESDAY" },
              { label: "Thursday", id: "THURSDAY" },
              { label: "Friday", id: "FRIDAY" },
              { label: "Saturday", id: "SATURDAY" }
            ]}
            labelKey="label"
            valueKey="id"
            value={eachServiceInfo.day}
            placeholder="Choose day"
            onChange={params =>
              setService({
                type: "SINGLE_VALUE_SERVICE_INFO",
                key: "day",
                index,
                payload: params.value
              })
            }
          />

          <TextInput
            containerStyle={{ minWidth: "initial", margin: 0 }}
            style={{ height: "100%" }}
            type="number"
            placeholder="Enter No. Of Clients To Serve"
            onChange={e =>
              setService({
                type: "SINGLE_VALUE_SERVICE_INFO",
                key: "maximumClientsToServe",
                index,
                payload: e.target.value
              })
            }
          />
        </EachServiceInfo>
      ))}
      <Button
        style={{ alignSelf: "center", margin: "3rem 0" }}
        small
        reverse
        text="Add Service For Another Day"
        type="button"
        onClick={e => {
          const startTime = new Date();
          startTime.setHours(10);
          startTime.setMinutes(0);
          startTime.setMilliseconds(0);

          const endTime = new Date();
          endTime.setHours(17);
          endTime.setMinutes(0);
          endTime.setMilliseconds(0);
          setService({
            type: "ADD_NEW_SERVICE_INFO"
          });
        }}
      />
    </ServiceInfoContainer>
  );
};

const ServiceInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
`;

const EachServiceInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr) repeat(2, 1.5fr);
  grid-gap: 2rem;
`;

const TableHeader = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 0.1rem solid ${({ theme }) => theme.bannerColor};
  color: ${({ theme }) => theme.bannerColorDark};
  font-size: 2rem;
  text-align: center;
`;

export default ServiceInfo;
