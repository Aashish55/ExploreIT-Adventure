import React, { useRef, lazy, Suspense } from "react";
import SideNav from "../../components/utility/SideNav";
import { Router } from "@reach/router";

import PageContentWrapper from "../../components/utility/PageContentWrapper";
import NavAndContentWrapper from "../../components/utility/NavAndContentWrapper";

import useSmallNavigation from "../../customHooks/useSmallNavigation";
import { StaffContextProvider } from "../../contexts/staff";

const StaffsHome = lazy(() => import("./Staffs"));
const AddStaff = lazy(() => import("./AddStaff"));

const Staffs = ({ smallNavigationBar, setSmallNavigationBar }) => {
  const scrollingContainerRef = useRef();

  useSmallNavigation(
    scrollingContainerRef,
    setSmallNavigationBar,
    smallNavigationBar
  );

  return (
    <NavAndContentWrapper smallNavigationBar={smallNavigationBar}>
      <SideNav
        navItems={[
          { to: "./", text: "Staffs" },
          { to: "new", text: "Add Staff" }
        ]}
      />
      <PageContentWrapper ref={scrollingContainerRef}>
        <StaffContextProvider>
          <Suspense fallback="Loading...">
            <Router>
              <StaffsHome path="/" />
              <AddStaff path="new" />
            </Router>
          </Suspense>
        </StaffContextProvider>
      </PageContentWrapper>
    </NavAndContentWrapper>
  );
};

export default Staffs;
