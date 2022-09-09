import React, { useContext } from "react";
import DisplayName from "../modals/display-name";
import NewChat from "../modals/new-chat";
import { ModalContext } from "../../context/ModalContext";

const ModalManager = () => {
  const modal = useContext(ModalContext);
  switch (modal.modalId) {
    case "display_name":
      return <DisplayName />;
    case "new_chat":
      return <NewChat />;
    default:
      return null;
  }
};

export default ModalManager;
