import { useCallback, useEffect, useState } from "react";

export const useCheckUser = () => {
  const checkStorage = localStorage.getItem("user");
  const [user, setUser] = useState(
    checkStorage ? JSON.parse(checkStorage) : null
  );

  const check = useCallback(() => {
    if (user) {
      if (
        window.location.pathname === "/login" ||
        window.location.pathname === "/signup"
      ) {
        return (window.location.href = "/home");
      }
    } else if (user === null && window.location.pathname !== "/login") {
      return (window.location.href = "/login");
    }
  }, [user]);

  useEffect(() => {
    check();
  }, [check, user]);
  return { user, setUser };
};
