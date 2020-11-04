import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import Button from "./../../components/utility/Button";
import HorizontalLine from "../utility/HorizontalLine";
import axios from "axios";

import { AuthContext } from "./../../contexts/auth";

const DropDown = ({ doLogOut, data }) => {
  const { switchVendor, getAuthInfo } = useContext(AuthContext);

  const handleSwitchVendor = async newVendor => {
    const authInfo = getAuthInfo();

    const { data: resDada } = await axios.post(
      `${process.env.REACT_APP_adventureServerHostName}/api/v1/vendors/login?vendor=${newVendor}`,
      {},
      { headers: { exploreItToken: authInfo.exploreItToken } }
    );

    switchVendor(resDada.token);
  };

  return (
    <DropDownContainer
      initial={{ y: "50px", opacity: 0 }}
      animate={{ y: "0", opacity: 1 }}
      exit={{ y: "50px", opacity: 0 }}
    >
      <DropDownItems>
        <DropDownTitle>Switch Vendors</DropDownTitle>
        <DropDownCollectionItems>
          {data.userAsAdmins.map(vendor => (
            <SwitchVendorButton
              key={vendor.name}
              onClick={() => {
                handleSwitchVendor(vendor._id);
              }}
            >
              Admin | {<VendorTitle>{vendor.name}</VendorTitle>}
            </SwitchVendorButton>
          ))}
          {data.userAsStaffs.map(staff => (
            <SwitchVendorButton
              onClick={() => {
                handleSwitchVendor(staff.vendor._id);
              }}
              key={staff.vendor.name}
            >
              {staff.title} | {<VendorTitle>{staff.vendor.name}</VendorTitle>}
            </SwitchVendorButton>
          ))}
        </DropDownCollectionItems>
        <HorizontalLine />
        <DropDownCollectionItems>
          <DropDownItem onClick={doLogOut}>
            <Button onClick={doLogOut} text="Logout" reverse />
          </DropDownItem>
        </DropDownCollectionItems>
      </DropDownItems>
    </DropDownContainer>
  );
};

const DropDownContainer = styled(motion.div)`
  position: absolute;
  min-width: 30rem;
  max-width: 100%;
  top: 100%;
  right: 0;
  padding: 2rem;
  background-color: ${({ theme }) => theme.white};
  border-radius: 2rem;

  font-size: 1.5rem;
`;

const DropDownCollectionItems = styled.div`
  margin: 1rem 0;
`;

const DropDownItems = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  list-style: none;
`;

const DropDownTitle = styled.h3`
  align-self: flex-start;
  border-bottom: 1px solid ${({ theme }) => theme.navIconsColor};
  padding-bottom: 0.2rem;
  color: ${({ theme }) => theme.navIconsColor};
  margin-left: 0.5rem;
`;

const DropDownItem = styled.li`
  padding: 1.5rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }
`;

const SwitchVendorButton = styled.li`
  color: ${({ theme }) => theme.textColorBlack};
  cursor: pointer;
  padding: 0.5rem;
  transition: background-color 0.2s;
  &:hover {
    background-color: ${({ theme }) => theme.lightBlack};
  }
`;

const VendorTitle = styled.span`
  color: ${({ theme }) => theme.bannerColor};
`;

export default DropDown;
