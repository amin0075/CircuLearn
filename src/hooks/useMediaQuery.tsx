import { useState, useLayoutEffect } from "react";

const useMediaQuery = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useLayoutEffect(() => {
    const resize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return windowWidth;
};

export default useMediaQuery;
