import { getRequest } from "./requestTypes";

const api = process.env.REACT_APP_API_URL;

export const fetchChatsService = async (display_name: string) => {
    return await getRequest(`${api}/chats`, { display_name }).then((res) => {
        return res;
    });
    };