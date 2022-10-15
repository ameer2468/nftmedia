import React, { useContext } from "react";
import Modal from "../global/modal";
import bin from "../../lottie/delete.json";
import { ModalContext } from "../../context/ModalContext";
import { supabase } from "../../constants/supabase";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Confirm = () => {
  const { setModalId } = useContext(ModalContext);
  const { state } = useLocation() as any;
  const navigate = useNavigate();
  const deleteHandler = async () => {};
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: bin,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Modal
      subtext="Are you sure you want to delete your thread?"
      title="Confirm"
      onClick={deleteHandler}
      cancelHandler={() => setModalId(null)}
      cancelButton={true}
      lottie={defaultOptions}
    />
  );
};

export default Confirm;
