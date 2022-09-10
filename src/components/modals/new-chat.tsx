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
import { ChatsContext } from "../../context/ChatsContext";

const NewChat = () => {
  const { user } = useContext(UserContext);
  const [createLoading, setCreateLoading] = useState(false);
  const { setModalId } = useContext(ModalContext);
  const {chats, setChats} = useContext(ChatsContext);
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
    setCreateLoading(true);
    await supabase
      .from("chats")
      .insert({ users: [user?.display_name, userSelected] }).then(({data}) => {
        console.log(data)
         setChats([...chats, data])
      });
    setModalId(null);
    setCreateLoading(false);
  };
  return (
    <Modal
      lottieWidth={"50%"}
      lottieHeight={"50%"}
      title="New Chat"
      loading={createLoading}
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
