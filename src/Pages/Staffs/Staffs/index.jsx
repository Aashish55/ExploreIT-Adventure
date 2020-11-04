import React, { useEffect } from "react";
import styled from "styled-components";
import PageTitle from "../../../components/utility/PageTitle";
import { useContext } from "react";
import { StaffContext } from "../../../contexts/staff";
import { Link } from "@reach/router";

const Staffs = ({}) => {
  const { staffs, getStaffs } = useContext(StaffContext);

  useEffect(() => {
    if (!staffs) {
      getStaffs();
    }
  }, []);

  if (staffs)
    return (
      <StaffsHomeContainer>
        <PageTitle>Staffs</PageTitle>
        <StaffsContainer>
          {staffs.map(staff => (
            <StaffContainer key={staff._id}>
              <StaffPhotoContainer>
                <StaffPhoto alt={staff.user.name} src={staff.user.photo} />
              </StaffPhotoContainer>
              <StaffInfoContainer>
                <StaffName>{staff.user.name}</StaffName>
                <StaffTitle>
                  <i>{staff.title}</i>
                </StaffTitle>
              </StaffInfoContainer>
            </StaffContainer>
          ))}
        </StaffsContainer>
      </StaffsHomeContainer>
    );

  return "Loading...";
};

const StaffsHomeContainer = styled.div``;

const StaffsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2rem;
  margin: 2rem 0;
  font-size: 2.5rem;
`;

const StaffContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.navIconsColor};
  background-color: ${({ theme }) => theme.whiteTransparent};
  border-radius: 2px;
`;

const StaffPhotoContainer = styled.figure`
  max-width: 10rem;
  max-height: 10rem;
  border-radius: 50%;
  overflow: hidden;
`;

const StaffPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StaffInfoContainer = styled.div`
  margin-left: 2rem;
`;

const StaffName = styled.p``;

const StaffTitle = styled.p`
  color: ${({ theme }) => theme.bannerColor};
  font-size: 1.75rem;
`;

export default Staffs;
