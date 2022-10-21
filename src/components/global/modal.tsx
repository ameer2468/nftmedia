import React, { useContext } from "react";
import Button from "./button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { ModalContext } from "../../context/ModalContext";
import { AnimatePresence, motion } from "framer-motion";
import Lottie, { Options } from "react-lottie";

interface props {
  title: string;
  children?: React.ReactNode;
  onClick?: () => void;
  hideButton?: boolean;
  hideClose?: boolean;
  loading?: boolean;
  disabled?: boolean;
  subtext?: string;
  lottie?: Options;
  lottieWidth?: string;
  lottieHeight?: string;
  cancelButton?: boolean;
  cancelHandler?: () => void;
}

const Modal = ({
  title,
  children,
  onClick,
  hideButton,
  loading,
  disabled,
  cancelHandler,
  subtext,
  hideClose,
  lottieWidth,
  lottieHeight,
  cancelButton,
  lottie,
}: props) => {
  const { setModalId, modalId } = useContext(ModalContext);
  return (
    <AnimatePresence>
      {modalId && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed z-[100] w-full h-full bg-opacity-50 px-5 bg-zinc-700 flex justify-center items-center"
        >
          <div className="w-[850px] h-[400px] rounded h-auto bg-white relative">
            {hideClose ? (
              ""
            ) : (
              <div
                onClick={() => setModalId(null)}
                className="absolute transition-all duration-200 rounded-full flex
         justify-center items-center rounded-xl
         cursor-pointer right-[-10px] top-[-10px] bg-zinc-50 w-10 h-10
         hover:bg-sky-500 hover:text-white"
              >
                <FontAwesomeIcon icon={faClose} />
              </div>
            )}
            <div className="flex rounded h-full">
              <div className="bg-gradient-to-br h-full overflow-hidden to-sky-50 rounded-bl rounded-tl from-sky-200 w-[50%] flex items-center">
                <Lottie
                  isClickToPauseDisabled={true}
                  options={lottie as Options}
                  height={lottieHeight || "100%"}
                  width={lottieWidth || "100%"}
                />
              </div>
              <div className="w-[50%] px-10 flex items-center justify-evenly flex-wrap">
                <div className="w-full">
                  <h1 className="text-left text-black w-full text-xl font-bold mb-2">
                    {title}
                  </h1>
                  <p className="text-left text-sm leading-6 w-full">
                    {subtext}
                  </p>
                  <div className="my-8">{children}</div>
                  <div className="flex gap-4 w-full">
                    {hideButton ? null : (
                      <Button
                        loading={loading}
                        disabled={loading || disabled}
                        onClick={onClick}
                        className={`
                      bg-sky-500 h-14 w-full normal-case font-normal text-[14px] ml-auto mr-auto
                      ${disabled ? "bg-gray-500 cursor-not-allowed" : ""}
                    `}
                        text="Confirm"
                      />
                    )}
                    {cancelButton ? (
                      <Button
                        onClick={cancelHandler}
                        className={`bg-gray-400 h-14 w-full 
        normal-case font-normal text-[14px] ml-auto mr-auto`}
                        text="Cancel"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
