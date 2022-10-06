import axios from "axios"
import { getRequest } from "./requestTypes";


const API_URL = process.env.REACT_APP_API_URL;


export const getChats = async (display_name: string) => {
    return await getRequest(`${API_URL}/chats`, {display_name});
}
