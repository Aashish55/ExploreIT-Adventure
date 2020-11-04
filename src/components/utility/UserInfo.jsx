import React from "react";
import styled from "styled-components";
import useFetch from "../../customHooks/useFetch";

const UserInfo = ({ userId }) => {
  const { data, loading, error } = useFetch({
    url: `${process.env.REACT_APP_mainServerHostName}/api/v1/users/${userId}`,
    method: "get"
  });

  if (loading) {
    return "Loading...";
  }

  return (
    <UserContainer>
      <Username>Username : {data.username}</Username>
      <UserName>Name : {data.name}</UserName>
    </UserContainer>
  );
};

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const UserName = styled.p``;

const Username = styled.p``;

export default UserInfo;
