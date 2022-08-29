import { BigHead } from "@bigheads/core";
import React, { memo } from "react";

interface props {
  className?: string;
}

const Avatar = ({ className }: props) => {
  return (
    <div className={className}>
      <BigHead
        accessory="shades"
        body="chest"
        circleColor="blue"
        clothing="tankTop"
        clothingColor="black"
        eyebrows="angry"
        eyes="wink"
        facialHair="mediumBeard"
        graphic="react"
        hair="short"
        hairColor="black"
        hat="none"
        hatColor="green"
        lashes={false}
        lipColor="purple"
        mask={true}
        faceMask={true}
        mouth="open"
        skinTone="brown"
      />
    </div>
  );
};

export const AvatarMemo = memo(Avatar);
