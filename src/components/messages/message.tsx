import { useContext } from "react";
import { IChatMessage } from "../../types/chat";
import { AvatarMemo } from "../global/avatar";
import moment from "moment";
import {UserContext} from '../../context/UserContext';

interface props {
  message: IChatMessage;
  className?: string;
}

const Message = ({message, className}: props) => {
  const {user} = useContext(UserContext);
  return (
   <div className={`${className} ${message.user === user?.display_name && 'bg-sky-100'} bg-white w-[400px]
    h-auto rounded-md mb-3 px-4 py-3 mt-[20px]`}>
   <div className="flex items-center justify-between">
     <div className="flex items-center">
       {message.avatar_image_url !== null ? <img alt="avatar" src={message.avatar_image_url as string} className="w-8 mr-2"/> : <AvatarMemo className="w-10 mb-3" />}
       <p className="font-bold text-sm">{message.user}</p>
     </div>
     <p className="text-zinc-400 text-xs">{moment(message.created_at).format('lll')}</p>
   </div>
   <p className="text-sm leading-6 mt-3">
     {message.message}
   </p>
 </div> 
  );
};

export default Message;
