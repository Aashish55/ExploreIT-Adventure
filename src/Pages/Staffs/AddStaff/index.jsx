import React, { useState } from "react";
import styled from "styled-components";
import PageTitle from "../../../components/utility/PageTitle";
import { useContext } from "react";
import { StaffContext } from "../../../contexts/staff";
import TextInput from "./../../../components/utility/TextInput";
import Button from "../../../components/utility/Button";
import SectionTitle from "../../../components/utility/SectionTitle";
import useLazyFetch from "../../../customHooks/useLazyFetch";
import { useEffect } from "react";
import { AuthContext } from "../../../contexts/auth";

const AddStaff = () => {
  const [staff, setStaff] = useState({
    username: "",
    title: "",
    bookingAuthorities: [],
    serviceAuthorities: [],
    staffAuthorities: [],
    vendorAuthorities: []
  });
  const { loading, data, error, fetch: sendReq } = useLazyFetch({
    url: `${process.env.REACT_APP_adventureServerHostName}/api/v1/staffs`,
    method: "post"
  });
  const { getStaffs } = useContext(StaffContext);
  const { getAuthInfo } = useContext(AuthContext);

  const authInfo = getAuthInfo();

  useEffect(() => {
    if (data) {
      getStaffs();
    }
  }, [data]);

  const handleSubmit = async e => {
    e.preventDefault();

    sendReq({
      username: staff.username,
      title: staff.title,
      vendor: authInfo.dataFromToken.vendorId,
      authorities: [
        { of: "BOOKING", isAbleTo: staff.bookingAuthorities },
        { of: "SERVICE", isAbleTo: staff.serviceAuthorities },
        { of: "STAFF", isAbleTo: staff.staffAuthorities },
        { of: "VENDOR", isAbleTo: staff.vendorAuthorities }
      ]
    });
  };

  return (
    <AddStaffContainer>
      {// If error display errors
      error && "Error Occurred"}
      <PageTitle>Add Staff</PageTitle>
      <FormContainer onSubmit={handleSubmit}>
        <TextInput
          placeholder="Username"
          value={staff.username}
          onChange={e => setStaff({ ...staff, username: e.target.value })}
        />
        <TextInput
          placeholder="Title"
          onChange={e => setStaff({ ...staff, title: e.target.value })}
        />
        <AuthoritiesContainer>
          <SectionTitle>Authorities To The User</SectionTitle>
          <AuthoritiesSelectionContainer>
            <EachAuthoritySelectionContainer>
              <AuthorityTitle>BOOKING</AuthorityTitle>
              <AuthoritySelectionContainer>
                <AuthoritySelection
                  onClick={() => {
                    if (staff.bookingAuthorities.indexOf("CREATE") !== -1) {
                      // If it was selected unselect it
                      setStaff({
                        ...staff,
                        bookingAuthorities: staff.bookingAuthorities.filter(
                          eachAuthority => eachAuthority !== "CREATE"
                        )
                      });
                    } else {
                      // Add to list
                      setStaff({
                        ...staff,
                        bookingAuthorities: [
                          ...staff.bookingAuthorities,
                          "CREATE"
                        ]
                      });
                    }
                  }}
                  selected={staff.bookingAuthorities.indexOf("CREATE") !== -1}
                >
                  CREATE
                </AuthoritySelection>
                <AuthoritySelection
                  onClick={() => {
                    if (staff.bookingAuthorities.indexOf("READ") !== -1) {
                      // If it was selected unselect it
                      setStaff({
                        ...staff,
                        bookingAuthorities: staff.bookingAuthorities.filter(
                          eachAuthority => eachAuthority !== "READ"
                        )
                      });
                    } else {
                      // Add to list
                      setStaff({
                        ...staff,
                        bookingAuthorities: [
                          ...staff.bookingAuthorities,
                          "READ"
                        ]
                      });
                    }
                  }}
                  selected={staff.bookingAuthorities.indexOf("READ") !== -1}
                >
                  READ
                </AuthoritySelection>
                <AuthoritySelection
                  onClick={() => {
                    if (staff.bookingAuthorities.indexOf("UPDATE") !== -1) {
                      // If it was selected unselect it
                      setStaff({
                        ...staff,
                        bookingAuthorities: staff.bookingAuthorities.filter(
                          eachAuthority => eachAuthority !== "UPDATE"
                        )
                      });
                    } else {
                      // Add to list
                      setStaff({
                        ...staff,
                        bookingAuthorities: [
                          ...staff.bookingAuthorities,
                          "UPDATE"
                        ]
                      });
                    }
                  }}
                  selected={staff.bookingAuthorities.indexOf("UPDATE") !== -1}
                >
                  UPDATE
                </AuthoritySelection>
                <AuthoritySelection
                  onClick={() => {
                    if (staff.bookingAuthorities.indexOf("DELETE") !== -1) {
                      // If it was selected unselect it
                      setStaff({
                        ...staff,
                        bookingAuthorities: staff.bookingAuthorities.filter(
                          eachAuthority => eachAuthority !== "DELETE"
                        )
                      });
                    } else {
                      // Add to list
                      setStaff({
                        ...staff,
                        bookingAuthorities: [
                          ...staff.bookingAuthorities,
                          "DELETE"
                        ]
                      });
                    }
                  }}
                  selected={staff.bookingAuthorities.indexOf("DELETE") !== -1}
                >
                  DELETE
                </AuthoritySelection>
              </AuthoritySelectionContainer>
            </EachAuthoritySelectionContainer>
            <EachAuthoritySelectionContainer>
              <AuthorityTitle>SERVICE</AuthorityTitle>
              <AuthoritySelectionContainer>
                <AuthoritySelection
                  onClick={() => {
                    if (staff.serviceAuthorities.indexOf("CREATE") !== -1) {
                      // If it was selected unselect it
                      setStaff({
                        ...staff,
                        serviceAuthorities: staff.serviceAuthorities.filter(
                          eachAuthority => eachAuthority !== "CREATE"
                        )
                      });
                    } else {
                      // Add to list
                      setStaff({
                        ...staff,
                        serviceAuthorities: [
                          ...staff.serviceAuthorities,
                          "CREATE"
                        ]
                      });
                    }
                  }}
                  selected={staff.serviceAuthorities.indexOf("CREATE") !== -1}
                >
                  CREATE
                </AuthoritySelection>
                <AuthoritySelection
                  onClick={() => {
                    if (staff.serviceAuthorities.indexOf("READ") !== -1) {
                      // If it was selected unselect it
                      setStaff({
                        ...staff,
                        serviceAuthorities: staff.serviceAuthorities.filter(
                          eachAuthority => eachAuthority !== "READ"
                        )
                      });
                    } else {
                      // Add to list
                      setStaff({
                        ...staff,
                        serviceAuthorities: [
                          ...staff.serviceAuthorities,
                          "READ"
                        ]
                      });
                    }
                  }}
                  selected={staff.serviceAuthorities.indexOf("READ") !== -1}
                >
                  READ
                </AuthoritySelection>
                <AuthoritySelection
                  onClick={() => {
                    if (staff.serviceAuthorities.indexOf("UPDATE") !== -1) {
                      // If it was selected unselect it
                      setStaff({
                        ...staff,
                        serviceAuthorities: staff.serviceAuthorities.filter(
                          eachAuthority => eachAuthority !== "UPDATE"
                        )
                      });
                    } else {
                      // Add to list
                      setStaff({
                        ...staff,
                        serviceAuthorities: [
                          ...staff.serviceAuthorities,
                          "UPDATE"
                        ]
                      });
                    }
                  }}
                  selected={staff.serviceAuthorities.indexOf("UPDATE") !== -1}
                >
                  UPDATE
                </AuthoritySelection>
                <AuthoritySelection
                  onClick={() => {
                    if (staff.serviceAuthorities.indexOf("DELETE") !== -1) {
                      // If it was selected unselect it
                      setStaff({
                        ...staff,
                        serviceAuthorities: staff.serviceAuthorities.filter(
                          eachAuthority => eachAuthority !== "DELETE"
                        )
                      });
                    } else {
                      // Add to list
                      setStaff({
                        ...staff,
                        serviceAuthorities: [
                          ...staff.serviceAuthorities,
                          "DELETE"
                        ]
                      });
                    }
                  }}
                  selected={staff.serviceAuthorities.indexOf("DELETE") !== -1}
                >
                  DELETE
                </AuthoritySelection>
              </AuthoritySelectionContainer>
            </EachAuthoritySelectionContainer>
            <EachAuthoritySelectionContainer>
              <AuthorityTitle>STAFF</AuthorityTitle>
              <AuthoritySelectionContainer>
                <AuthoritySelection
                  onClick={() => {
                    if (staff.staffAuthorities.indexOf("CREATE") !== -1) {
                      // If it was selected unselect it
                      setStaff({
                        ...staff,
                        staffAuthorities: staff.staffAuthorities.filter(
                          eachAuthority => eachAuthority !== "CREATE"
                        )
                      });
                    } else {
                      // Add to list
                      setStaff({
                        ...staff,
                        staffAuthorities: [...staff.staffAuthorities, "CREATE"]
                      });
                    }
                  }}
                  selected={staff.staffAuthorities.indexOf("CREATE") !== -1}
                >
                  CREATE
                </AuthoritySelection>
                <AuthoritySelection
                  onClick={() => {
                    if (staff.staffAuthorities.indexOf("READ") !== -1) {
                      // If it was selected unselect it
                      setStaff({
                        ...staff,
                        staffAuthorities: staff.staffAuthorities.filter(
                          eachAuthority => eachAuthority !== "READ"
                        )
                      });
                    } else {
                      // Add to list
                      setStaff({
                        ...staff,
                        staffAuthorities: [...staff.staffAuthorities, "READ"]
                      });
                    }
                  }}
                  selected={staff.staffAuthorities.indexOf("READ") !== -1}
                >
                  READ
                </AuthoritySelection>
                <AuthoritySelection
                  onClick={() => {
                    if (staff.staffAuthorities.indexOf("UPDATE") !== -1) {
                      // If it was selected unselect it
                      setStaff({
                        ...staff,
                        staffAuthorities: staff.staffAuthorities.filter(
                          eachAuthority => eachAuthority !== "UPDATE"
                        )
                      });
                    } else {
                      // Add to list
                      setStaff({
                        ...staff,
                        staffAuthorities: [...staff.staffAuthorities, "UPDATE"]
                      });
                    }
                  }}
                  selected={staff.staffAuthorities.indexOf("UPDATE") !== -1}
                >
                  UPDATE
                </AuthoritySelection>
                <AuthoritySelection
                  onClick={() => {
                    if (staff.staffAuthorities.indexOf("DELETE") !== -1) {
                      // If it was selected unselect it
                      setStaff({
                        ...staff,
                        staffAuthorities: staff.staffAuthorities.filter(
                          eachAuthority => eachAuthority !== "DELETE"
                        )
                      });
                    } else {
                      // Add to list
                      setStaff({
                        ...staff,
                        staffAuthorities: [...staff.staffAuthorities, "DELETE"]
                      });
                    }
                  }}
                  selected={staff.staffAuthorities.indexOf("DELETE") !== -1}
                >
                  DELETE
                </AuthoritySelection>
              </AuthoritySelectionContainer>
            </EachAuthoritySelectionContainer>
            <EachAuthoritySelectionContainer>
              <AuthorityTitle>VENDOR</AuthorityTitle>
              <AuthoritySelectionContainer>
                <AuthoritySelection
                  onClick={() => {
                    if (staff.vendorAuthorities.indexOf("READ") !== -1) {
                      // If it was selected unselect it
                      setStaff({
                        ...staff,
                        vendorAuthorities: staff.vendorAuthorities.filter(
                          eachAuthority => eachAuthority !== "READ"
                        )
                      });
                    } else {
                      // Add to list
                      setStaff({
                        ...staff,
                        vendorAuthorities: [...staff.vendorAuthorities, "READ"]
                      });
                    }
                  }}
                  selected={staff.vendorAuthorities.indexOf("READ") !== -1}
                >
                  READ
                </AuthoritySelection>
                <AuthoritySelection
                  onClick={() => {
                    if (staff.vendorAuthorities.indexOf("UPDATE") !== -1) {
                      // If it was selected unselect it
                      setStaff({
                        ...staff,
                        vendorAuthorities: staff.vendorAuthorities.filter(
                          eachAuthority => eachAuthority !== "UPDATE"
                        )
                      });
                    } else {
                      // Add to list
                      setStaff({
                        ...staff,
                        vendorAuthorities: [
                          ...staff.vendorAuthorities,
                          "UPDATE"
                        ]
                      });
                    }
                  }}
                  selected={staff.vendorAuthorities.indexOf("UPDATE") !== -1}
                >
                  UPDATE
                </AuthoritySelection>
                <AuthoritySelection
                  onClick={() => {
                    if (staff.vendorAuthorities.indexOf("DELETE") !== -1) {
                      // If it was selected unselect it
                      setStaff({
                        ...staff,
                        vendorAuthorities: staff.vendorAuthorities.filter(
                          eachAuthority => eachAuthority !== "DELETE"
                        )
                      });
                    } else {
                      // Add to list
                      setStaff({
                        ...staff,
                        vendorAuthorities: [
                          ...staff.vendorAuthorities,
                          "DELETE"
                        ]
                      });
                    }
                  }}
                  selected={staff.vendorAuthorities.indexOf("DELETE") !== -1}
                >
                  DELETE
                </AuthoritySelection>
              </AuthoritySelectionContainer>
            </EachAuthoritySelectionContainer>
          </AuthoritiesSelectionContainer>
        </AuthoritiesContainer>
        {loading ? (
          "Spinner"
        ) : (
          <Button text="Add Staff" onClick={handleSubmit} />
        )}
      </FormContainer>
    </AddStaffContainer>
  );
};

const AddStaffContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
`;

const FormContainer = styled.form`
  max-width: 50rem;
`;

const AuthoritiesContainer = styled.div``;

const AuthoritiesSelectionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;
`;

const EachAuthoritySelectionContainer = styled.div``;

const AuthorityTitle = styled.p`
  margin: 2rem 0 1rem 0;
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
`;

const AuthoritySelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AuthoritySelection = styled.li`
  list-style: none;
  margin: 1rem 0;
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

export default AddStaff;
