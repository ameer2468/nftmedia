import React, { useContext, useState } from "react";
import Modal from "../global/modal";
import bin from "../../lottie/delete.json";
import { ModalContext } from "../../context/ModalContext";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { deletePostService } from "../../services/post";

const Confirm = () => {
  const { setModalId } = useContext(ModalContext);
  const navigate = useNavigate();
  const postId = useLocation().pathname.split("/")[2];
  const [deleteLoading, setDeleteLoading] = useState(false);
  const deleteHandler = async () => {
    setDeleteLoading(true);
    await deletePostService(Number(postId));
    setDeleteLoading(false);
    setModalId(null);
    toast.success("Post deleted successfully", {
      position: "top-right",
    });
    navigate("/home");
  };
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
      loading={deleteLoading}
      cancelHandler={() => setModalId(null)}
      cancelButton={true}
      lottie={defaultOptions}
    />
  );
};

export default Confirm;
