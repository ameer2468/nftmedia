import React from "react";
import Modal from "../global/modal";
import TextInput from "../global/textinput";
import { useDisplayname } from "../../hooks/useDisplayName";
import thinking from "../../lottie/thinking.json";

const DisplayName = () => {
  const { handler, loading, submit } = useDisplayname();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: thinking,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Modal
      title="Display Name"
      onClick={() => submit()}
      loading={loading}
      hideClose={true}
      subtext="A name of your choice that you can be identified by: can be changed once every 30 days"
      lottie={defaultOptions}
    >
      <div className="flex items-center gap-10">
        <TextInput
          minLength={5}
          maxLength={10}
          onChange={(e) => {
            handler(e);
          }}
          className="bg-zinc-50"
          placeholder="Enter name"
        />
      </div>
    </Modal>
  );
};

export default DisplayName;
