import { useEffect, useCallback } from "react";

const useSmallNavigation = (
  scrollingContainerRef,
  setSmallNavigationBar,
  smallNavigationBar
) => {
  const handleScroll = useCallback(() => {
    if (scrollingContainerRef.current.scrollTop > 0 && !smallNavigationBar) {
      setSmallNavigationBar(true);
    } else if (
      scrollingContainerRef.current.scrollTop <= 0 &&
      smallNavigationBar
    ) {
      setSmallNavigationBar(false);
    }
  }, [smallNavigationBar]);

  useEffect(() => {
    const domNode = scrollingContainerRef.current;
    domNode.addEventListener("scroll", handleScroll);
    return () => {
      domNode.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
};

export default useSmallNavigation;
