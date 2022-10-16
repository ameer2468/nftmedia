import { deleteRequest, getRequest } from "./requestTypes";
import axios from "axios";

const api = process.env.REACT_APP_API_URL;

export const fetchPostService = async (
  postid: string | undefined,
  userid: number | undefined
) => {
  return await getRequest(`${api}/post`, { postid, userid });
};

export const getRecentPosts = async () => {
  return await axios.get(`${api}/posts`).then((res) => {
    return res.data.threads;
  });
};

export const deletePostService = async (threadId: number | undefined) => {
  return await deleteRequest(`${api}/post`, { threadId });
};
