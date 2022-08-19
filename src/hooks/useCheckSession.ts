import { useLocation } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useLogin } from "./useLogin";

export const useCheckSession = () => {
  const sessionToken = localStorage.getItem("user");
  const path = useLocation().pathname;
  const { logout } = useLogin();
  // const parseJwt = (token: string) => {
  //   try {
  //     return JSON.parse(atob(token.split(".")[1]));
  //   } catch (e) {
  //     return null;
  //   }
  // };
  const checkSession = useCallback(async () => {
    if (sessionToken != null) {
      const userData = JSON.parse(sessionToken);
      if (userData.token.exp * 1000 < Date.now()) {
        await logout(userData.id);
      }
    }
  }, [logout, sessionToken]);
  useEffect(() => {
    checkSession();
  }, [checkSession, path]);
};
