import axios from "axios";

const api = process.env.REACT_APP_API_URL;

export const fetchUserProfile = async (userId: string) => {
  const response = await axios.get(`${api}/profile`, {
    params: {
      userId,
    },
  });
  return response.data;
};
