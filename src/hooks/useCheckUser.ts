import { useCallback, useEffect, useState } from "react";

export const useCheckUser = () => {
  const checkStorage = localStorage.getItem("user");
  const [user, setUser] = useState(
    checkStorage ? JSON.parse(checkStorage) : null
  );
  const location = window.location;

  const check = useCallback(() => {
    if (user) {
      if (location.pathname === "/login" || location.pathname === "/signup") {
        return (location.href = "/home");
      }
    } else if (
      location.pathname !== "/login" &&
      location.pathname !== "/signup"
    ) {
      return (location.href = "/login");
    }
  }, [location, user]);

  useEffect(() => {
    check();
  }, [check, user, checkStorage]);
  return { user, setUser };
};
