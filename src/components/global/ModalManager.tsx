import React, { useContext } from "react";
import DisplayName from "../modals/display-name";
import NewChat from "../modals/new-chat";
import { ModalContext } from "../../context/ModalContext";
import Confirm from "../modals/confirm";

const ModalManager = () => {
  const modal = useContext(ModalContext);
  switch (modal.modalId) {
    case "display_name":
      return <DisplayName />;
    case "new_chat":
      return <NewChat />;
    case "confirm":
      return <Confirm />;
    default:
      return null;
  }
};

export default ModalManager;
