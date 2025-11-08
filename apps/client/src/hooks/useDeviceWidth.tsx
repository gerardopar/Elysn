import { useState, useEffect } from "react";

/**
 * useDeviceWidth
 * Detects whether the viewport width is below or equal to a given breakpoint
 *
 * @param breakpoint - number (default: 768) -> px size to compare against
 * @returns { isMobile: boolean, width: number }
 */
export const useDeviceWidth = (breakpoint: number = 768) => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const isMobile = width <= breakpoint;

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile, width };
};

export default useDeviceWidth;
