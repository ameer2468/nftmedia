import React, { useCallback, useContext, 
  useEffect, useRef, useState } from "react";
import TextAreaInput from "../global/textarea";
import { useFormHook } from "../../hooks/useFormHook";
import Message from "./message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import EmojiPicker from "emoji-picker-react";
import { useDetectOutsideClick } from "../../hooks/useDetectOutsideClick";
import { onEmojiClick } from "../../helpers/emojiClick";
import { IChatMessage } from "../../types/chat";
import {supabase} from "../../constants/supabase";
import { UserContext } from "../../context/UserContext";
import Scrollbars from "react-custom-scrollbars-2";
import scrollToBottom from "react-custom-scrollbars-2";

interface props {
  activeChat: number | null;
}

const Chat = ({activeChat}: props) => {
  const { onChangeHandler, inputValues, setInputValues } = useFormHook({
    message: "",
  });
  const {user} = useContext(UserContext);
  const [messages, setMessages] = useState<IChatMessage[] | null>(null);
  const inputRef: any = useRef(0);
  const chatRef = useRef<any>(null);
  const emojiRef = useRef(null);
  const [showEmojis, setShowEmojis] = useDetectOutsideClick(emojiRef, false);
  const getData = useCallback(async () => {
    if (activeChat) {
      setMessages(null);
       await supabase.from('messages').select('*').eq('chat_id', activeChat).then(({data, error}) => {
          setMessages(data)
        })
      }
  }, [activeChat])
  useEffect(() => {
    getData();
  }, [activeChat, getData])
  useEffect(() => {
    console.log('test')
    supabase.from("messages:chat_id=eq." + activeChat)
    .on("INSERT", (payload) => {
        setMessages((messages) => [...messages as [], payload.new]);
      })
      .subscribe()
  }, [messages])
  const sendMessage = async () => {
     await supabase.from('messages').insert({
        chat_id: activeChat,
        message: inputValues.message,
        user: user?.display_name
      })
      setInputValues({message: ''});
      chatRef.current?.scrollToBottom();
  }
  

  return (
    <div className="bg-gradient-to-br to-zinc-50 from-sky-50 w-[70%] rounded-r-lg border-white border">
      <div className="flex w-full h-[500px] p-5">
        <Scrollbars ref={chatRef} autoHeight autoHeightMin={470}>
        {messages?.map((message, index) => (
         message.user === user?.display_name ? 
           <Message className="ml-auto" key={index} message={message} />
           : 
           <Message className="bg-white" key={index} message={message} />
        ))}
        </Scrollbars>
      </div>
      <div
        className="w-full bg-sky-100 h-[100px]
       py-5 px-10 flex items-center
       justify-between relative rounded-b-lg"
      >
        {showEmojis ? (
          <div className="absolute right-[10px] top-[-300px]">
            <EmojiPicker
              onEmojiClick={(event, emojiObject) =>
                onEmojiClick(
                  event,
                  emojiObject,
                  inputRef,
                  "message",
                  inputValues,
                  setInputValues
                )
              }
            />
          </div>
        ) : null}
        <div className="flex w-full gap-4 items-center">
          <TextAreaInput
            className="flex-auto w-4/5"
            hideLimit={true}
            disableResize={true}
            inputref={inputRef}
            name="message"
            value={inputValues.message}
            placeholder="Enter message..."
            onChange={onChangeHandler}
          />
          <div
            onClick={sendMessage}
            className="bg-black flex items-center w-12 h-12 justify-center
           p-3 rounded-full hover:bg-zinc-700 transition-all duration-200 cursor-pointer"
          >
            <FontAwesomeIcon className="text-white" icon={faPaperPlane} />
          </div>
          <div className="flex gap-4">
            <div
              ref={emojiRef}
              onClick={() => setShowEmojis(!showEmojis)}
              className="bg-sky-500 flex items-center w-12 h-12 justify-center
           p-3 rounded-full hover:bg-sky-400 transition-all duration-200 cursor-pointer"
            >
              <FontAwesomeIcon className="text-white" icon={faFaceSmile} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
