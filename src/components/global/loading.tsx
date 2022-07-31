import React from "react";
import { BarLoader } from "react-spinners";

interface props {
  color: string;
}

const Loading = ({ color }: props) => {
  return <BarLoader color={color} />;
};

export default Loading;
