import { ChangeEvent, useState } from "react";

export const useFormHook = (form: { [key: string]: string }) => {
  const [inputValues, setInputValues] = useState<any>(form);

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    return setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setInputValues(form);
  };

  return {
    onChangeHandler,
    form,
    inputValues,
    setInputValues,
    resetForm,
  };
};
