import React, { Dispatch, SetStateAction } from "react";

export const onEmojiClick = (
  event: any,
  emojiObject: any,
  ref: React.RefObject<any>,
  key: string,
  state: { [key: string]: string },
  stateUpdate: Dispatch<SetStateAction<{ [key: string]: string }>>
) => {
  const selectionEnd = ref?.current.selectionEnd;
  const messageUpdate = () => {
    let arr = [];
    for (let i = 0; i < state[key].length; i++) {
      arr.push(state[key][i]);
    }
    arr.splice(selectionEnd, 0, emojiObject?.emoji);
    return arr.join("");
  };
  stateUpdate({ ...state, [key]: messageUpdate() });
};
