import { createContext, Dispatch, SetStateAction } from "react";
import { ModalID } from "../types/modals";

export const ModalContext = createContext<{
  modalId: keyof ModalID | null;
  setModalId: Dispatch<SetStateAction<keyof ModalID | null>>;
}>({
  modalId: null,
  setModalId: () => "",
});
