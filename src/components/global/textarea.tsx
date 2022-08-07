import React, { RefObject, useState } from "react";

interface props {
  placeholder: string;
  onChange?: (e?: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  type?: string;
  minLength?: number;
  maxLength?: number;
  name?: string;
  onFocus?: () => void;
  inputref?: RefObject<any>;
  value?: string;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

const TextAreaInput = ({
  placeholder,
  onChange,
  className,
  onBlur,
  inputref,
  onFocus,
  name,
  value,
  maxLength,
  minLength,
}: props) => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <textarea
        placeholder={placeholder}
        onChange={(e: any) => {
          onChange?.(e);
          setCount(e.target.value.length);
        }}
        onFocus={onFocus}
        name={name}
        onBlur={onBlur}
        ref={inputref}
        minLength={minLength}
        value={value}
        maxLength={maxLength}
        className={`text-sm bg-white px-5 w-full p-5 rounded-xl transition-all duration-200
         border-transparent border-2 h-14 placeholder-black text-black 
         focus:outline-0 focus:border-sky-500
         ${className}
      `}
      />
      <p className="mt-4 w-full text-right">{`${count} / ${maxLength}`}</p>
    </div>
  );
};

export default TextAreaInput;
