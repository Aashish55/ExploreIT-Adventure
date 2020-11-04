import React, { useRef, lazy, Suspense, useMemo } from "react";
import SideNav from "../../components/utility/SideNav";
import { Router } from "@reach/router";

import PageContentWrapper from "../../components/utility/PageContentWrapper";
import NavAndContentWrapper from "../../components/utility/NavAndContentWrapper";

import useSmallNavigation from "../../customHooks/useSmallNavigation";

const Bookings = lazy(() => import("./Bookings"));
const NewBooking = lazy(() => import("./NewBooking"));

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
          <NewBooking path="new" />
          <Bookings path="/" />
        </Router>
      </Suspense>
    ),
    []
  );

  return (
    <NavAndContentWrapper smallNavigationBar={smallNavigationBar}>
      <SideNav
        navItems={[
          { to: "./", text: "Bookings" },
          { to: "new", text: "New Booking" }
        ]}
      />
      <PageContentWrapper ref={scrollingContainerRef}>
        {memoized}
      </PageContentWrapper>
    </NavAndContentWrapper>
  );
};
