import { getRequest } from "./requestTypes";
import axios from "axios";

const api = process.env.REACT_APP_API_URL;

export const fetchPostService = async (
  userid: number,
  postid: string | undefined
) => {
  return await getRequest(`${api}/post`, { userid, postid });
};

export const getRecentPosts = async () => {
  return await axios.get(`${api}/posts`).then((res) => {
    return res.data.threads;
  });
};
