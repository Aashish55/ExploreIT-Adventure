import React from "react";
import styled from "styled-components";
import { Datepicker } from "baseui/datepicker";
import Label from "./Label";

export default ({
  value,
  onChange,
  label,
  hideLabel,
  containerStyle = {},
  ...otherProps
}) => {
  return (
    <DatepickerContainer style={containerStyle}>
      {hideLabel ? null : <Label label={label} />}
      <Datepicker
        value={value}
        onChange={({ date }) => onChange(Array.isArray(date) ? date : [date])}
        overrides={{
          BaseInput: {
            style: {
              backgroundColor: "rgba(255,255,255,0.3)",
              outline: "none",
              borderBottom: "1.5px solid rgb(17, 151, 213)",
              fontSize: "2rem",
              padding: ".7rem 0 0 0"
            }
          },
          InputWrapper: {
            style: {
              backgroundColor: "rgba(255,255,255,0.3)",
              outline: "none",
              borderBottom: "1.5px solid rgb(17, 151, 213)",
              fontSize: "2rem",
              padding: ".7rem 0 0 0"
            }
          },
          CalendarHeader: {
            style: {
              backgroundColor: "#c54409"
            }
          },
          MonthHeader: {
            style: {
              backgroundColor: "#c54409"
            }
          },
          MonthYearSelectButton: {
            style: {
              ":focus": {
                outline: "none"
              }
            }
          }
        }}
        {...otherProps}
      />
    </DatepickerContainer>
  );
};

const DatepickerContainer = styled.div``;
