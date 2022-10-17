import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Loading from "./loading";

interface props {
  text?: string;
  className?: string;
  image?: string;
  icon?: IconProp;
  loading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({
  text,
  className,
  image,
  icon,
  onClick,
  loading,
  disabled,
}: props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-white transition-all duration-200
        font-bold gap-2 text-md flex items-center justify-center
         py-4 px-8 rounded-xl hover:brightness-105 uppercase ${className}`}
    >
      {loading ? (
        <Loading color="white" width="100%" />
      ) : (
        <>
          {icon && <FontAwesomeIcon icon={icon} />}
          {image && <img className="w-10" src={image} alt="icon" />}
          {text || ""}
        </>
      )}
    </button>
  );
};

export default Button;
