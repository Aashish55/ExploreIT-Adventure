import React, { useReducer, useCallback, useMemo } from "react";
import styled from "styled-components";
import PageTitle from "../../../components/utility/PageTitle";
import { useContext } from "react";
import TextInput from "./../../../components/utility/TextInput";
import ParagraphInput from "./../../../components/utility/ParagraphInput";
import Select from "./../../../components/utility/Select";
import useLazyFetch from "../../../customHooks/useLazyFetch";
import useFetch from "../../../customHooks/useFetch";
import { AuthContext } from "../../../contexts/auth";

import { Checkbox, LABEL_PLACEMENT, STYLE_TYPE } from "baseui/checkbox";
import { StarRating } from "baseui/rating";

import Label from "../../../components/utility/Label";
import MediaUpload from "./MediaUpload";
import ServiceInfo from "./ServiceInfo";
import Button from "../../../components/utility/Button";

let startTime = new Date();
startTime.setHours(10);
startTime.setMinutes(0);
startTime.setMilliseconds(0);

let endTime = new Date();
endTime.setHours(17);
endTime.setMinutes(0);
endTime.setMilliseconds(0);

const AddService = () => {
  const [service, setService] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "SINGLE_VALUE":
          return { ...state, [action.key]: action.payload };
        case "WHOLE_STATE":
          return action.payload;
        case "ADD_NEW_SERVICE_INFO":
          startTime = new Date();
          startTime.setHours(10);
          startTime.setMinutes(0);
          startTime.setMilliseconds(0);

          endTime = new Date();
          endTime.setHours(17);
          endTime.setMinutes(0);
          endTime.setMilliseconds(0);
          return {
            ...state,
            serviceInfo: [
              ...state.serviceInfo,
              {
                day: [],
                startTime,
                endTime,
                maximumClientsToServe: 0
              }
            ]
          };
        case "SINGLE_VALUE_SERVICE_INFO":
          return {
            ...state,
            serviceInfo: [
              ...state.serviceInfo.slice(0, action.index),
              {
                ...state.serviceInfo[action.index],
                [action.key]: action.payload
              },
              ...state.serviceInfo.slice(
                action.index + 1,
                state.serviceInfo.length
              )
            ]
          };
        default:
          return state;
      }
    },
    {
      adventure: [],
      medias: [],
      price: "",
      description: "",
      currentAvailability: true,
      difficulty: 8,
      serviceInfo: [
        {
          day: [],
          startTime,
          endTime,
          maximumClientsToServe: 0
        }
      ]
    }
  );

  const { getAuthInfo } = useContext(AuthContext);

  const handleSuccess = useCallback(() => {
    startTime = new Date();
    startTime.setHours(10);
    startTime.setMinutes(0);
    startTime.setMilliseconds(0);

    endTime = new Date();
    endTime.setHours(17);
    endTime.setMinutes(0);
    endTime.setMilliseconds(0);
    setService({
      type: "WHOLE_STATE",
      payload: {
        adventure: [],
        medias: [],
        price: "",
        description: "",
        currentAvailability: true,
        difficulty: 8,
        serviceInfo: [
          {
            day: [],
            startTime,
            endTime,
            maximumClientsToServe: null
          }
        ]
      }
    });
  }, []);

  const { loading, error, fetch: sendReq } = useLazyFetch({
    url: `${process.env.REACT_APP_adventureServerHostName}/api/v1/services`,
    method: "post",
    onSuccess: handleSuccess
  });

  const {
    loading: adventuresLoading,
    data: adventures,
    error: adventuresFetchError
  } = useFetch({
    url: `${process.env.REACT_APP_adventureServerHostName}/api/v1/adventures`,
    method: "get"
  });

  const handleSubmit = async e => {
    e.preventDefault();

    const authInfo = getAuthInfo();

    // Validate every field here except media, that one will be validated during media upload.

    if (service.adventure.length === 0) {
      alert("Choose adventure");
      return;
    }

    if (service.description.length < 10) {
      alert("Write longer description");
      return;
    }

    if (service.description.length < 10) {
      alert("Write longer description");
      return;
    }

    if (service.price.length === 0) {
      alert("Write proper description");
      return;
    }

    let finalRequestBody = {
      ...service,
      vendor: authInfo.dataFromToken.vendorId
    };

    let allow = true;

    service.serviceInfo.forEach(eachService => {
      if (eachService.day.length === 0) {
        allow = false;
      }
    });

    if (!allow) {
      alert("Choose proper day for service.");
      return;
    }

    console.log(finalRequestBody);

    finalRequestBody.adventure = finalRequestBody.adventure[0]._id;

    finalRequestBody.medias = finalRequestBody.medias.map(
      eachMedia => eachMedia._id
    );

    finalRequestBody.serviceInfo = finalRequestBody.serviceInfo.map(
      eachServiceInfo => ({
        ...eachServiceInfo,
        day: eachServiceInfo.day[0].id
      })
    );

    sendReq(finalRequestBody);
  };

  const memoizedServiceInfo = useMemo(() => {
    return (
      <ServiceInfo serviceInfo={service.serviceInfo} setService={setService} />
    );
  }, [service.serviceInfo]);

  const memoizedMediaUpload = useMemo(() => {
    return <MediaUpload medias={service.medias} setService={setService} />;
  }, [service.medias]);

  return (
    <CreateNewServiceContainer>
      {// If error display errors
      error && "Error Occurred"}
      <PageTitle>Create a New Service</PageTitle>
      <FormContainer onSubmit={handleSubmit}>
        <Label label="Choose Adventure" />
        <Select
          options={adventures}
          labelKey="name"
          valueKey="_id"
          value={service.adventure}
          placeholder="Choose Adventure"
          onChange={params =>
            setService({
              type: "SINGLE_VALUE",
              key: "adventure",
              payload: params.value
            })
          }
          isLoading={adventuresLoading}
        />
        <ParagraphInput
          value={service.description}
          onChange={e => {
            setService({
              type: "SINGLE_VALUE",
              key: "description",
              payload: e.target.value
            });
          }}
          showLabel={true}
          label="Description"
          placeholder="A proper description..."
        />
        <Checkbox
          checkmarkType={STYLE_TYPE.toggle_round}
          checked={service.currentAvailability}
          onChange={e =>
            setService({
              type: "SINGLE_VALUE",
              key: "currentAvailability",
              payload: e.target.checked
            })
          }
          labelPlacement={LABEL_PLACEMENT.left}
          overrides={{
            Root: {
              style: {
                borderBottom: "1.5px solid rgb(17, 151, 213)",
                paddingBottom: "1rem",
                paddingLeft: "1rem;"
              }
            },
            Label: {
              style: {
                fontSize: "2rem",
                color: "#333",
                fontWeight: "normal"
              }
            },
            Toggle: {
              style: {
                backgroundColor: service.currentAvailability
                  ? "rgb(2, 147, 214)"
                  : "#edf9ff"
              }
            },
            ToggleTrack: {
              style: {
                backgroundColor: "rgb(103, 217, 245)"
              }
            }
          }}
        >
          Is This Currently Available ?
        </Checkbox>
        <TextInput
          value={service.price}
          onChange={e => {
            setService({
              type: "SINGLE_VALUE",
              key: "price",
              payload: e.target.value
            });
          }}
          showLabel={true}
          label="Price"
          placeholder="Price..."
        />
        <Label label="Enter Difficulty Level" />
        <br />
        <StarRating
          value={service.difficulty}
          numItems={10}
          onChange={({ value }) =>
            setService({
              type: "SINGLE_VALUE",
              key: "difficulty",
              payload: value
            })
          }
          overrides={{
            Root: {
              style: {
                marginTop: "1rem",
                paddingBottom: "1rem",
                borderBottom: "1.5px solid rgb(17, 151, 213)",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }
            }
          }}
        />
        {memoizedMediaUpload}
        {memoizedServiceInfo}
        <Button
          text="Create New Service"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)"
          }}
        />
      </FormContainer>
    </CreateNewServiceContainer>
  );
};

const CreateNewServiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 70vh;
`;

const FormContainer = styled.form`
  max-width: 80rem;
  min-width: 50rem;
  margin-top: 3rem;
  position: relative;
  padding-bottom: 5rem;
`;

export default AddService;
