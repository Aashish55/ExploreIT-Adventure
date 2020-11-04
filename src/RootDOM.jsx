import React, { lazy, Suspense, useState } from "react";
import Navigation from "./components/Navigation";
import { Router, Location } from "@reach/router";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import AuthenticatedRoute from "./components/utility/AuthenticatedRoute";
import NotAuthenticatedRoute from "./components/utility/NotAuthenticatedRoute";
import { StaffContextProvider } from "./contexts/staff";

const Home = lazy(() => import("./Pages/Home"));
const Login = lazy(() => import("./Pages/Login"));

const Dashboard = lazy(() => import("./Pages/Dashboard"));
const Services = lazy(() => import("./Pages/Services"));
const Bookings = lazy(() => import("./Pages/Bookings"));
const Staffs = lazy(() => import("./Pages/Staffs"));

const RootDOM = () => {
  const [smallNavigationBar, setSmallNavigationBar] = useState(false);

  const [theme, setTheme] = useState({
    white: "#fff",
    whiteTransparent: "rgba(255,255,255,.5)",
    bannerColor: "#c54409",
    bannerColorDark: "#692100",
    navItemColor: "#414042",
    navIconsColor: "rgb(17, 151, 213)",
    textColorBlack: "#414042",
    black: "#333",
    lightBlack: "#f0f0f0",
    lightestBlack: "#f9f9f9",
    lightBlue: "#1197d5",
    lightestBlue: "#edf9ff",
    darkBlue: "rgb(2, 147, 214)",
  });

  return (
    <RootElement>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Location>
          {({ location }) => (
            <Navigation
              smallNavigationBar={smallNavigationBar}
              location={location}
            />
          )}
        </Location>

        <RoutesWrapper>
          <Suspense fallback="Loading...">
            <Router>
              <Home
                smallNavigationBar={smallNavigationBar}
                setSmallNavigationBar={setSmallNavigationBar}
                path="/"
              />
              <NotAuthenticatedRoute
                smallNavigationBar={smallNavigationBar}
                setSmallNavigationBar={setSmallNavigationBar}
                as={Login}
                path="login"
              />
              <AuthenticatedRoute
                smallNavigationBar={smallNavigationBar}
                setSmallNavigationBar={setSmallNavigationBar}
                as={Dashboard}
                path="dashboard/*"
              />
              <AuthenticatedRoute
                smallNavigationBar={smallNavigationBar}
                setSmallNavigationBar={setSmallNavigationBar}
                as={Services}
                path="services/*"
              />
              <AuthenticatedRoute
                smallNavigationBar={smallNavigationBar}
                setSmallNavigationBar={setSmallNavigationBar}
                as={Bookings}
                path="bookings/*"
              />
              <AuthenticatedRoute
                smallNavigationBar={smallNavigationBar}
                setSmallNavigationBar={setSmallNavigationBar}
                as={Staffs}
                path="staffs/*"
              ></AuthenticatedRoute>
            </Router>
          </Suspense>
        </RoutesWrapper>
      </ThemeProvider>
    </RootElement>
  );
};

const RootElement = styled.div`
  overflow: hidden;
`;

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
    font-family: Lato, sans-serif;
  }

  *, *::after, *::before {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    overflow: hidden;
  }

  ::-webkit-scrollbar {
    width: 1rem;
    left: 0;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const RoutesWrapper = styled.div`
  margin-left: 4rem;
`;

export default RootDOM;
