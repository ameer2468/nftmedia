import React, { useState } from "react";
import TextInput from "../components/global/textinput";
import TextAreaInput from "../components/global/textarea";
import Button from "../components/global/button";
import Picker from "emoji-picker-react";

const New = () => {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const onEmojiClick = (event: any, emojiObject: any) => {
    setChosenEmoji(emojiObject);
  };
  return (
    <div className="w-full top-post pt-48 px-5  lg:pl-64 lg:pr-32 lg:pt-48">
      <h2 className="font-bold text-black text-[30px] lg:text-[40px]">
        📰 New Post
      </h2>
      <div className="bg-gradient-to-br to-zinc-50 from-sky-50 p-10 rounded-xl mt-10">
        <TextInput placeholder="Post title" />
        <div className="mt-5">
          <Picker
            pickerStyle={{
              width: "100%",
              marginBottom: "20px",
              height: "250px",
            }}
            onEmojiClick={onEmojiClick}
          />
          <TextAreaInput
            className="h-[250px] resize-none"
            placeholder="Post content"
            maxLength={800}
          />
        </div>
        <Button className="normal-case bg-sky-500 mt-3" text="Submit" />
      </div>
    </div>
  );
};

export default New;
