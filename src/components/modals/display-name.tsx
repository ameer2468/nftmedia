import React from "react";
import Modal from "../global/modal";
import TextInput from "../global/textinput";
import { useDisplayname } from "../../hooks/useDisplayName";

const DisplayName = () => {
  const { handler, loading, submit } = useDisplayname();
  return (
    <Modal
      title="Display Name"
      onClick={() => submit()}
      loading={loading}
      hideClose={true}
      subtext="A name of your choice that you can be identified by"
    >
      <TextInput
        minLength={5}
        maxLength={10}
        onChange={(e) => {
          handler(e);
        }}
        className="bg-zinc-50"
        placeholder="Enter name"
      />
    </Modal>
  );
};

export default DisplayName;
