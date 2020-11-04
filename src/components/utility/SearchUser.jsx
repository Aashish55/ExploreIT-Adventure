import React, { useState, useEffect } from "react";
import Select from "./Select";
import { TYPE } from "baseui/select";
import axios from "axios";

import useLazyFetch from "./../../customHooks/useLazyFetch";

const SearchUser = ({ value, onChange }) => {
  const [users, setUsers] = useState([]);

  return (
    <Select
      options={users}
      labelKey="username"
      valueKey="_id"
      value={value}
      placeholder="Select User"
      onChange={params => onChange(params.value)}
      rootStyle={{ maxWidth: "30rem" }}
      onInputChange={async e => {
        const {
          data: { users }
        } = await axios.get(
          `${process.env.REACT_APP_mainServerHostName}/api/v1/users/search?username=${e.target.value}`
        );
        setUsers(users);
      }}
      maxDropdownHeight="300px"
      type={TYPE.search}
    />
  );
};

export default SearchUser;
