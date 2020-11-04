import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";

const SideNav = ({ navItems }) => {
  return (
    <SideNavWrapper>
      <SideNavContainer>
        {navItems.map(navItem => (
          <NavItem key={navItem.text}>
            <NavLink to={navItem.to}>{navItem.text}</NavLink>
          </NavItem>
        ))}
      </SideNavContainer>
    </SideNavWrapper>
  );
};

const SideNavWrapper = styled.nav`
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${({ theme }) => theme.lightBlue};
`;

const SideNavContainer = styled.ul`
  list-style: none;
`;

const NavItem = styled.li`
  position: relative;
  color: ${({ theme }) => theme.white};
  border-bottom: 1px solid ${({ theme }) => theme.lightestBlue};
  border-top: 1px solid ${({ theme }) => theme.lightestBlue};
  margin-top: -1px;

  &:hover {
    color: ${({ theme }) => theme.lightBlue};
  }

  &:before {
    z-index: 1;
    content: "";
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    right: 0;
    transform: scaleY(0);
    background-color: ${({ theme }) => theme.lightestBlue};
    transition: transform 0.2s;
  }

  &:hover::before {
    transform: scaleY(1);
    width: 100%;
  }
`;

const NavLink = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 2rem;
  z-index: 10;
  padding: 2rem 0;
  transition: color 0.2s cubic-bezier(1, 0, 0, 1);
  color: currentColor;
`;

export default SideNav;
