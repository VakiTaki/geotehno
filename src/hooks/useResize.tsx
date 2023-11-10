import { useState, useEffect } from "react";
import { SCREEN_SM, SCREEN_MD, SCREEN_LG } from "../config/widthBreakpoints";

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event: Event) => {
      setWidth((event.target as Window).innerWidth);
    };
    window.addEventListener("resize", (e) => handleResize(e));
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    width,
    isScreenSm: width >= SCREEN_SM,
    isScreenMd: width >= SCREEN_MD,
    isScreenLg: width >= SCREEN_LG,
  };
};
