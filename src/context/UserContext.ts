import { createContext } from "react";
import { IUser } from "../types/user";

export const UserContext = createContext<{ user: IUser | null; setUser: any }>({
  user: null,
  setUser: () => {},
});
export const UserProvider = UserContext.Provider;
