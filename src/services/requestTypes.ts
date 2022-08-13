import axios from "axios";

export const getRequest = async (url: string, params?: {}) => {
  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      ...params,
    },
  });
  return response.data;
};

export const postRequest = async (url: string, data: {}) => {
  const response = await axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
