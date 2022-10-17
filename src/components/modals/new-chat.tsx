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
import { IUserInfo } from "../../types/user";

const NewChat = () => {
  const { user } = useContext(UserContext);
  const [createLoading, setCreateLoading] = useState(false);
  const { setModalId } = useContext(ModalContext);
  const { chats, setChats } = useContext(ChatsContext);
  const [errorMessage, setErrorMessage] = useState<string>("");
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
  const [userSelected, setUserSelected] = useState<IUserInfo | null>(null);
  const [show, setShow] = useState(false);
  const nameDebounce = useDebounce(inputValues.display_name, 300);
  const { users, setUsers } = useSearchUsers(nameDebounce);
  useEffect(() => {
    if (inputValues.display_name && users && !userSelected) {
      setShow(true);
    } else if (userSelected) {
      setShow(false);
    }
    return () => {
      setShow(false);
    };
  }, [inputValues.display_name, userSelected, users]);
  const createChat = async () => {
    const checkChat = chats.map((chat) => {
      return chat.users
        .map((user) => user.user)
        .includes(userSelected?.display_name as string);
    });
    if (
      checkChat.includes(true) &&
      userSelected?.display_name !== user?.display_name
    ) {
      return setErrorMessage("A chat with this user already exists");
    } else if (userSelected?.display_name === user?.display_name) {
      return setErrorMessage("You can't chat with yourself");
    }
    setCreateLoading(true);
    await supabase
      .from("chats")
      .insert({ users: [user?.display_name, userSelected?.display_name] })
      .then((res: any) => {
        const data = res.data[0];
        const parseData = {
          ...data,
          users: JSON.parse(data.users).map((value: string) => {
            return {
              user: value,
              avatar_image_url:
                user?.display_name === value
                  ? user?.avatar_image_url
                  : userSelected?.avatar_image_url,
            };
          }),
          last_message: {
            created_at: null,
            message: null,
          },
        };
        setChats([...chats, parseData]);
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
      <div className="flex items-center flex-col relative">
        <TextInput
          onChange={onChangeHandler}
          name="display_name"
          value={inputValues.display_name}
          onFocus={() => {
            setUserSelected(null);
          }}
          className="bg-zinc-50 w-full"
          placeholder="Enter display name..."
        />
        {errorMessage && (
          <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
        )}
        {show ? (
          <div className="absolute bottom-0 left-0">
            <TagUser
              data={users}
              onUserClick={(user) => {
                setShow(false);
                setUsers(null);
                setUserSelected(user);
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
