import { getRequest } from "./requestTypes";

const api = process.env.REACT_APP_API_URL;

export const fetchPostService = async (
  userid: number,
  postid: string | undefined
) => {
  return await getRequest(`${api}/post`, { userid, postid });
};
