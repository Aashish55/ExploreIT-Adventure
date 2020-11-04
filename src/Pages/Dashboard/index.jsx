import React, { useRef, lazy, Suspense, useMemo } from "react";
import SideNav from "../../components/utility/SideNav";
import { Router } from "@reach/router";

import PageContentWrapper from "../../components/utility/PageContentWrapper";
import NavAndContentWrapper from "../../components/utility/NavAndContentWrapper";

import useSmallNavigation from "../../customHooks/useSmallNavigation";
import Home from "./Home";

export default ({ smallNavigationBar, setSmallNavigationBar }) => {
  const scrollingContainerRef = useRef();

  useSmallNavigation(
    scrollingContainerRef,
    setSmallNavigationBar,
    smallNavigationBar
  );

  const memoized = useMemo(
    () => (
      <Suspense fallback="Loading...">
        <Router>
          <Home path="/" />
        </Router>
      </Suspense>
    ),
    []
  );

  return (
    <NavAndContentWrapper smallNavigationBar={smallNavigationBar}>
      <SideNav navItems={[{ to: "./", text: "Dashboard" }]} />
      <PageContentWrapper ref={scrollingContainerRef}>
        {memoized}
      </PageContentWrapper>
    </NavAndContentWrapper>
  );
};
