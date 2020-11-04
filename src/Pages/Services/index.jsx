import React, { useRef, lazy, Suspense, useMemo } from "react";
import SideNav from "../../components/utility/SideNav";
import { Router } from "@reach/router";

import PageContentWrapper from "../../components/utility/PageContentWrapper";
import NavAndContentWrapper from "../../components/utility/NavAndContentWrapper";

import useSmallNavigation from "../../customHooks/useSmallNavigation";

const Services = lazy(() => import("./Services"));
const AddService = lazy(() => import("./AddService"));

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
          <AddService path="new" />
          <Services path="/" />
        </Router>
      </Suspense>
    ),
    []
  );

  return (
    <NavAndContentWrapper smallNavigationBar={smallNavigationBar}>
      <SideNav
        navItems={[
          { to: "./", text: "Services" },
          { to: "new", text: "Add Service" }
        ]}
      />
      <PageContentWrapper ref={scrollingContainerRef}>
        {memoized}
      </PageContentWrapper>
    </NavAndContentWrapper>
  );
};
