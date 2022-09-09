import React, { useContext, useEffect, useState } from "react";
import Modal from "../global/modal";
import message from "../../lottie/message.json";
import TextInput from "../global/textinput";
import TagUser from "../post/tagUser";
import { useDebounce } from "../../hooks/useDebounce";
import { useSearchUsers } from "../../hooks/useSearchUsers";
import { useFormHook } from "../../hooks/useFormHook";
import { supabase } from "../../constants/supabase";
import { UserContext } from "../../context/UserContext";
import { ModalContext } from "../../context/ModalContext";

const NewChat = () => {
  const { user } = useContext(UserContext);
  const { setModalId } = useContext(ModalContext);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: message,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { setInputValues, onChangeHandler, inputValues } = useFormHook({
    display_name: "",
  });
  const [userSelected, setUserSelected] = useState("");
  const [show, setShow] = useState(false);
  const nameDebounce = useDebounce(inputValues.display_name, 300);
  const { users, setUsers } = useSearchUsers(nameDebounce);
  useEffect(() => {
    if (inputValues.display_name && users && !userSelected) {
      setShow(true);
    }
  }, [inputValues.display_name, userSelected, users]);
  const createChat = async () => {
    await supabase
      .from("chats")
      .insert({ users: [user?.display_name, userSelected] });
    setModalId(null);
  };
  return (
    <Modal
      lottieWidth={"50%"}
      lottieHeight={"50%"}
      title="New Chat"
      onClick={createChat}
      disabled={!userSelected}
      subtext="Who would you like to message?"
      lottie={defaultOptions}
    >
      <div className="flex items-center gap-10 relative">
        <TextInput
          onChange={onChangeHandler}
          name="display_name"
          value={inputValues.display_name}
          onFocus={() => {
            setUserSelected("");
          }}
          className="bg-zinc-50"
          placeholder="Enter display name..."
        />
        {show ? (
          <div className="absolute bottom-0">
            <TagUser
              data={users}
              onUserClick={(user) => {
                setShow(false);
                setUsers(null);
                setUserSelected(user.display_name);
                setInputValues({
                  display_name: user.display_name,
                });
              }}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </Modal>
  );
};

export default NewChat;
