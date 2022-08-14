import { getRequest } from "./requestTypes";

const api = process.env.REACT_APP_API_URL;

export const fetchUserProfile = async (userid: string) => {
  return await getRequest(`${api}/profile`, { userid });
};
