import { useState } from "react";

export const useImageBroken = () => {
  const [imageBroken, setImageBroken] = useState(false);

  const handleImageError = () => {
    setImageBroken(true);
  };
  return {
    handleImageError,
    imageBroken,
  };
};
