import { createContext } from "react";

export const UserContext = createContext<string | null>(null);
export const UserProvider = UserContext.Provider;
