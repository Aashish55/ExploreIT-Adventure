import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Link as RouterLink } from "@reach/router";
import { motion, AnimatePresence } from "framer-motion";

import { AuthContext } from "../../contexts/auth";

import User from "./User";

import Dashboard from "../../svgs/Dashboard";
import Services from "../../svgs/Services";
import Bookings from "../../svgs/Bookings";
import Home from "../../svgs/Home";
import Login from "../../svgs/Login";
import Staffs from "../../svgs/Staffs";

import Logo from "./../../images/Logo.png";

const Navigation = ({ location, smallNavigationBar }) => {
  const pathname = location.pathname;
  const { doLogOut, getAuthInfo } = useContext(AuthContext);

  const authInfo = getAuthInfo();

  return (
    <NavContainer
      variants={{
        smallHeight: {
          marginTop: "20px",
          marginBottom: "20px"
        },
        bigHeight: {
          marginTop: "40px",
          marginBottom: "40px"
        }
      }}
      animate={smallNavigationBar ? "smallHeight" : "bigHeight"}
    >
      <SideLogoContainer>
        <SideLogo src={Logo} /> <Title>| Adventures</Title>
      </SideLogoContainer>
      <NavItemsContainer>
        <EachNavItem
          icon={<Home />}
          to="/"
          text="Home"
          isActive={pathname === "/"}
        />
        {authInfo && (
          <React.Fragment>
            <EachNavItem
              icon={<Dashboard />}
              to="/dashboard"
              text="Dashboard"
              isActive={pathname === "/dashboard"}
            />
            <EachNavItem
              icon={<Services />}
              to="/services"
              text="Services"
              isActive={pathname.indexOf("/services") !== -1}
            />
            <EachNavItem
              icon={<Bookings />}
              to="/bookings"
              text="Bookings"
              isActive={pathname.indexOf("/bookings") !== -1}
            />
            <EachNavItem
              icon={<Staffs />}
              to="/staffs"
              text="Staffs"
              isActive={pathname.indexOf("/staffs") !== -1}
            />
          </React.Fragment>
        )}
        {pathname.indexOf("/login") !== -1 && (
          <EachNavItem
            icon={<Login />}
            to="/login"
            text="Login"
            isActive={pathname.indexOf("/login") !== -1}
          />
        )}
      </NavItemsContainer>
      <User authInfo={authInfo} doLogOut={doLogOut} />
    </NavContainer>
  );
};

const EachNavItem = ({ icon, text, to, isActive: initial }) => {
  const [isActive, setIsActive] = useState(initial);

  useEffect(() => {
    setIsActive(initial);
  }, [initial]);

  return (
    <NavItem
      onMouseEnter={() => {
        if (!initial) setIsActive(true);
      }}
      onFocus={() => {
        if (!initial) setIsActive(true);
      }}
      onBlur={() => {
        if (!initial) setIsActive(false);
      }}
      onMouseLeave={() => {
        if (!initial) setIsActive(false);
      }}
    >
      <Link to={to}>
        {icon}
        <AnimatePresence>
          {isActive && (
            <LinkText
              initial={{ width: "0px" }}
              animate={{ width: "auto" }}
              exit={{ width: "0px" }}
            >
              {text}
            </LinkText>
          )}
        </AnimatePresence>
      </Link>
    </NavItem>
  );
};

const NavContainer = styled(motion.nav)`
  height: 5rem;
  margin-right: 4rem;
  margin-left: 4rem;
  margin-top: 4rem;
  margin-bottom: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.navItemColor};
`;

const SideLogoContainer = styled.figure`
  height: 4rem;
  display: flex;
  font-size: 3rem;
`;

const SideLogo = styled.img`
  height: 100%;
`;

const Title = styled.span`
  margin-left: 1rem;
  color: ${({ theme }) => theme.bannerColor};
`;

const NavItemsContainer = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: none;
  list-style: none;
`;

const Link = styled(RouterLink)`
  text-decoration: none;
  color: currentColor;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  outline: none;

  &:focus {
    box-shadow: 0.5rem 0px 2rem -1rem ${({ theme }) => theme.navIconsColor};
  }

  svg {
    margin: 0 1rem;
  }
`;

const NavItem = styled.li`
  padding: 1.5rem;
  font-size: 2.5rem;
`;

const LinkText = styled(motion.p)`
  color: ${({ theme }) => theme.textColorBlack};
  text-align: center;
`;

export default Navigation;
