import { Select } from "baseui/select";
import React from "react";

export default ({
  value,
  options,
  labelKey,
  valueKey,
  onChange,
  placeholder,
  style = {},
  rootStyle = {},
  ...otherProps
}) => {
  return (
    <Select
      options={options}
      labelKey={labelKey}
      valueKey={valueKey}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      overrides={{
        Root: {
          style: {
            ...rootStyle
          }
        },
        ControlContainer: {
          style: {
            backgroundColor: "rgba(255,255,255,.3)",
            borderLeft: "none",
            borderRight: "none",
            borderTop: "none",
            borderBottom: "1.5px solid rgb(17, 151, 213)",
            width: "100%",
            fontFamily: "inherit",
            fontSize: "2rem",
            padding: ".7rem 0 0 0",
            ...style
          }
        }
      }}
      {...otherProps}
    />
  );
};
