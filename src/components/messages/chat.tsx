import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useFormHook } from "../../hooks/useFormHook";
import Message from "./message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import EmojiPicker from "emoji-picker-react";
import { useDetectOutsideClick } from "../../hooks/useDetectOutsideClick";
import { onEmojiClick } from "../../helpers/emojiClick";
import { IChatMessage } from "../../types/chat";
import { supabase } from "../../constants/supabase";
import { UserContext } from "../../context/UserContext";
import Scrollbars from "react-custom-scrollbars-2";
import TextInput from "../global/textinput";

interface props {
  activeChat: number | null;
}

const Chat = ({ activeChat }: props) => {
  const { onChangeHandler, inputValues, setInputValues } = useFormHook({
    message: "",
  });
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState<IChatMessage[] | null>(null);
  const inputRef: any = useRef(0);
  const chatRef = useRef<any>(null);
  const messageRef = useRef<any>(null);
  const emojiRef = useRef(null);
  const [showEmojis, setShowEmojis] = useDetectOutsideClick(emojiRef, false);
  const getData = useCallback(async () => {
    if (activeChat) {
      setMessages([]);
      await supabase
        .from("messages")
        .select("*")
        .eq("chat_id", activeChat)
        .then(({ data }) => {
          setMessages(data);
        });
    }
  }, [activeChat]);
  useEffect(() => {
    getData();
    const channel = supabase
      .from(`messages:chat_id=eq.${activeChat}`)
      .on("INSERT", (payload) => {
        setMessages((messages) => [...(messages as []), payload.new]);
      })
      .subscribe();
    return () => {
      supabase.removeSubscription(channel);
    };
  }, [activeChat, getData]);
  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const sendMessage = async () => {
    if (inputValues.message.length === 0) return;
    await supabase.from("messages").insert({
      chat_id: activeChat,
      message: inputValues.message,
      user: user?.display_name,
      avatar_image_url: user?.avatar_image_url,
    });
    setInputValues({ message: "" });
  };

  console.log(supabase.getSubscriptions());

  return (
    <div className="bg-gradient-to-br to-zinc-50 from-sky-50 w-[70%] rounded-r-lg border-white border">
      <div className="flex w-full h-[530px] p-5 overflow-hidden">
        <Scrollbars
          className="relative overflow-hidden"
          ref={chatRef}
          autoHeight
          autoHeightMin={480}
        >
          {messages?.map((message, index) => {
            return message.user === user?.display_name ? (
              <Message className="ml-auto" key={index} message={message} />
            ) : (
              <Message className="bg-white" key={index} message={message} />
            );
          })}
          {messages && messages?.length > 0 && (
            <div className="h-0" ref={messageRef} />
          )}
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
          <TextInput
            className="flex-auto w-4/5"
            enterKeyHandler={sendMessage}
            inputRef={inputRef}
            name="message"
            value={inputValues.message}
            placeholder="Enter message..."
            onChange={onChangeHandler}
          />
          <div
            onClick={sendMessage}
            className={`${
              inputValues.message.length === 0
                ? "bg-gray-300 cursor-not-allowed hover:bg-gray-300"
                : ""
            }
            bg-black flex items-center w-12 h-12 justify-center
           p-3 rounded-full hover:bg-zinc-700 transition-all duration-200 cursor-pointer`}
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
