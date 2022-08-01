import React, { useContext } from "react";
import Button from "./button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { ModalContext } from "../../context/ModalContext";
import { AnimatePresence, motion } from "framer-motion";

interface props {
  title: string;
  children: React.ReactNode;
  onClick?: () => void;
  hideButton?: boolean;
  hideClose?: boolean;
  loading?: boolean;
  subtext?: string;
}

const Modal = ({
  title,
  children,
  onClick,
  hideButton,
  loading,
  subtext,
  hideClose,
}: props) => {
  const { setModalId, modalId } = useContext(ModalContext);
  return (
    <AnimatePresence>
      {modalId && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed z-[100] w-full h-full bg-opacity-50 bg-zinc-700 flex justify-center items-center"
        >
          <div className="w-[500px] rounded h-auto bg-white p-14 relative">
            {hideClose ? (
              ""
            ) : (
              <div
                onClick={() => setModalId(null)}
                className="absolute transition-all duration-200 rounded-full flex
         justify-center items-center
         cursor-pointer right-[-10px] top-[-10px] bg-zinc-50 w-10 h-10
         hover:bg-sky-500 hover:text-white"
              >
                <FontAwesomeIcon icon={faClose} />
              </div>
            )}
            <h1 className="text-center text-black text-xl font-bold mb-2">
              {title}
            </h1>
            <p className="text-center text-sm">{subtext}</p>
            <div className="my-8">{children}</div>
            {hideButton ? null : (
              <Button
                loading={loading}
                disabled={loading}
                onClick={onClick}
                className="bg-sky-500 normal-case ml-auto mr-auto"
                text="Confirm"
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
