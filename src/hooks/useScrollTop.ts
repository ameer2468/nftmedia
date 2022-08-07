import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export const useScrollTop = () => {
  const path = useLocation();
  useEffect(() => {
    return window.scroll({
      top: 0,
    });
  }, [path]);
};
