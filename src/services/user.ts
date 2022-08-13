import { getRequest } from "./requestTypes";

const api = process.env.REACT_APP_API_URL;

export const fetchUserProfile = async (userId: string) => {
  return await getRequest(`${api}/profile`, { userId });
};
