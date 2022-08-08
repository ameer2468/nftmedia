import React, { useEffect, useRef, useState } from "react";
import TextInput from "../components/global/textinput";
import TextAreaInput from "../components/global/textarea";
import Button from "../components/global/button";
import Picker from "emoji-picker-react";
import { useFormHook } from "../hooks/useFormHook";
import { usePost } from "../hooks/usePost";

const New = () => {
  const inputRef: any = useRef(0);
  const [selectionValue, setSelectionValue] = useState(0);
  const form = {
    title: "",
    post: "",
  };
  useEffect(() => {
    setSelectionValue(inputRef.current.selectionStart);
  }, [inputRef]);
  console.log(selectionValue);
  const { inputValues, setInputValues, onChangeHandler } = useFormHook(form);
  const { submitNewPost, createLoading } = usePost(inputValues);
  const formCheck = inputValues.title.length > 0 && inputValues.post.length > 0;
  const onEmojiClick = (event: any, emojiObject: any) => {
    const selectionEnd = inputRef.current.selectionEnd;
    const postUpdate = () => {
      let arr = [];
      for (let i = 0; i < inputValues.post.length; i++) {
        arr.push(inputValues.post[i]);
      }
      arr.splice(selectionEnd, 0, emojiObject?.emoji);
      return arr.join("");
    };
    setInputValues({
      ...inputValues,
      post: postUpdate(),
    });
  };

  return (
    <div className="w-full h-auto top-post pt-48 px-5 lg:pl-64 lg:pr-32 lg:pt-48">
      <h2 className="font-bold text-black text-[30px] lg:text-[40px]">
        📰 New Post
      </h2>
      <div className="bg-gradient-to-br to-zinc-50 from-sky-50 p-10 rounded-xl mt-10">
        <TextInput
          onChange={(e: any) => {
            onChangeHandler(e);
          }}
          value={inputValues.title}
          name="title"
          placeholder="Post title"
        />
        <div className="mt-5 h-auto">
          <Picker
            pickerStyle={{
              width: "100%",
              marginBottom: "20px",
              height: "250px",
            }}
            onEmojiClick={onEmojiClick}
          />
          <TextAreaInput
            name={"post"}
            inputref={inputRef}
            value={inputValues.post}
            onChange={(e: any) => {
              onChangeHandler(e);
            }}
            className="min-h-[200px] resize-none block"
            placeholder="Post content"
            maxLength={800}
          />
        </div>
        <Button
          loading={createLoading}
          disabled={createLoading || !formCheck}
          onClick={() => submitNewPost(setInputValues)}
          className={`normal-case w-40 h-14 bg-sky-500 mt-3 ${
            formCheck ? "" : "opacity-50 cursor-not-allowed"
          }`}
          text="Submit"
        />
      </div>
    </div>
  );
};

export default New;
