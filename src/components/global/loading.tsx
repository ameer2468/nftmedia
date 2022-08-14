import React from "react";
import { BarLoader } from "react-spinners";

interface props {
  color: string;
  width?: number | string;
}

const Loading = ({ color, width }: props) => {
  return <BarLoader width={width} color={color} />;
};

export default Loading;
