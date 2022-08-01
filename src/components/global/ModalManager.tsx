import React, { useContext } from "react";
import DisplayName from "../modals/display-name";
import { ModalContext } from "../../context/ModalContext";

const ModalManager = () => {
  const modal = useContext(ModalContext);
  switch (modal.modalId) {
    case "display_name":
      return <DisplayName />;
    default:
      return null;
  }
};

export default ModalManager;
