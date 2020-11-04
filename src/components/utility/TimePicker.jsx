import React from "react";

import { TimePicker as TimePickerA } from "baseui/timepicker";

export default ({ value, onChange, placeholder }) => (
  <TimePickerA
    value={value}
    onChange={onChange}
    format="12"
    placeholder={placeholder}
    creatable
    step={900}
    overrides={{
      Select: {
        props: {
          overrides: {
            ControlContainer: {
              style: {
                backgroundColor: "rgba(255,255,255,.3)",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                borderBottom: "1.5px solid rgb(17, 151, 213)",
                width: "100%",
                fontFamily: "inherit",
                fontSize: "2rem",
                padding: ".7rem 0 0 0"
              }
            }
          }
        }
      }
    }}
  />
);
