import React, { useEffect, useRef, memo } from "react";
import TextInput from "../components/global/textinput";
import TextAreaInput from "../components/global/textarea";
import Button from "../components/global/button";
import Picker from "emoji-picker-react";
import { useFormHook } from "../hooks/useFormHook";
import { usePost } from "../hooks/usePost";
import { onEmojiClick } from "../helpers/emojiClick";
import { useLocation, useParams } from "react-router-dom";

const EditPost = () => {
  const inputRef: any = useRef(0);
  const form = {
    title: "",
    post: "",
  };
  useEffect(() => {}, [inputRef]);
  const { inputValues, setInputValues, onChangeHandler } = useFormHook(form);
  const { submitEditPost, editPostLoading } = usePost(inputValues);
  const params = useParams() as { id: string };
  const location = useLocation();
  const { title, content } = location.state as {
    title: string;
    content: string;
  };
  const formCheck =
    (inputValues.title.length > 0 &&
      inputValues.post.length > 0 &&
      inputValues.post !== content) ||
    inputValues.title !== title;
  useEffect(() => {
    setInputValues({
      title,
      post: content,
    });
  }, [content, setInputValues, title]);

  return (
    <div className="w-full h-auto top-post pt-48 px-5 lg:pl-64 lg:pr-32 lg:pt-48">
      <h2 className="font-bold text-black text-[30px] lg:text-[40px]">
        📰 Edit Post
      </h2>
      <div className="bg-gradient-to-br to-zinc-50 from-sky-50 p-10 rounded-xl mt-10">
        <TextInput
          onChange={(e: any) => {
            onChangeHandler(e);
          }}
          value={inputValues.title}
          name="title"
          placeholder={title}
        />
        <div className="mt-5 h-auto">
          <Picker
            pickerStyle={{
              width: "100%",
              marginBottom: "20px",
              height: "250px",
            }}
            onEmojiClick={(event, emojiObject) => {
              onEmojiClick(
                event,
                emojiObject,
                inputRef,
                "post",
                inputValues,
                setInputValues
              );
            }}
          />
          <TextAreaInput
            name={"post"}
            inputref={inputRef}
            value={inputValues.post}
            onChange={(e: any) => {
              onChangeHandler(e);
            }}
            className="min-h-[200px] resize-none block"
            placeholder={content}
            maxLength={800}
          />
        </div>
        <Button
          loading={editPostLoading}
          disabled={editPostLoading || !formCheck}
          onClick={() => submitEditPost(params.id)}
          className={`normal-case w-40 h-14 bg-sky-500 mt-3 ${
            formCheck ? "" : "bg-zinc-300 cursor-not-allowed"
          }`}
          text="Submit"
        />
      </div>
    </div>
  );
};

export default memo(EditPost);
