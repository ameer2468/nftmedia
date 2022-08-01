import { createContext } from "react";
import { IUser } from "../types/user";

export const UserContext = createContext<{ user: null | IUser; setUser: any }>({
  user: null,
  setUser: () => {},
});
export const UserProvider = UserContext.Provider;
