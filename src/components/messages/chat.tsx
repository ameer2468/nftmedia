import React from "react";
import TextAreaInput from "../global/textarea";
import { useFormHook } from "../../hooks/useFormHook";
import Message from "./message";

const Chat = () => {
  const { onChangeHandler } = useFormHook({
    message: "",
  });
  return (
    <div className="bg-gradient-to-br to-zinc-50 from-sky-50 w-[70%]">
      <div className="w-full h-[500px] p-5">
        <Message />
      </div>
      <div className="w-full bg-sky-100 h-[100px] p-5">
        <TextAreaInput
          className="w-[75%]"
          hideLimit={true}
          placeholder="Enter message..."
          onChange={onChangeHandler}
        />
      </div>
    </div>
  );
};

export default Chat;
