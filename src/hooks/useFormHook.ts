import { ChangeEvent, useState } from "react";

interface args {
  form: any;
}

export const useFormHook = ({ form }: args) => {
  const [inputValues, setInputValues] = useState(form);

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    return setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  return {
    onChangeHandler,
    form,
    inputValues,
    setInputValues,
  };
};
