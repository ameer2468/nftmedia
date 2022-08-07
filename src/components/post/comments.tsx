import React, { useState } from "react";
import Comment from "./comment";
import TextInput from "../global/textinput";
import { Avatar } from "../global/avatar";
import Button from "../global/button";
import { AnimatePresence, motion } from "framer-motion";

const Comments = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="bg-gradient-to-br to-zinc-50 from-sky-50 rounded-xl p-10">
      <h2 className="font-bold text-[25px] lg:text-[30px]">Comments</h2>
      <div className="mt-5 flex-col flex gap-5">
        <div className="flex w-full items-center">
          <Avatar className="w-16" />
          <TextInput
            className="w-full"
            onFocus={() => {
              setShow(true);
            }}
            placeholder="Add a comment"
          />
        </div>
        <AnimatePresence>
          {show ? (
            <motion.div
              className={"flex justify-end gap-5"}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              <Button
                onClick={() => {
                  setShow(false);
                }}
                className="bg-transparent border-2 border-sky-500 normal-case w-32 text-sky-500"
                text="Cancel"
              />
              <Button className=" bg-sky-500 normal-case w-32" text="Submit" />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      <div className="mt-5 flex flex-col gap-5">
        <Comment />
        <Comment />
        <Comment />
      </div>
    </div>
  );
};

export default Comments;
