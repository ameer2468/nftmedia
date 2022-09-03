import {
  theme,
  eyesMap,
  eyebrowsMap,
  mouthsMap,
  hairMap,
  facialHairMap,
  clothingMap,
  accessoryMap,
  graphicsMap,
  hatMap,
  bodyMap,
  BigHead,
} from "@bigheads/core";
import React, { memo } from "react";

interface props {
  className?: string;
}

const Avatar = ({ className }: props) => {
  function selectRandomKey(object: any) {
    return Object.keys(object)[
      Math.floor(Math.random() * Object.keys(object).length)
    ] as any;
  }
  const skinTone = selectRandomKey(theme.colors.skin);
  const eyes = selectRandomKey(eyesMap);
  const eyebrows = selectRandomKey(eyebrowsMap);
  const mouth = selectRandomKey(mouthsMap);
  const hair = selectRandomKey(hairMap);
  const facialHair = selectRandomKey(facialHairMap);
  const clothing = selectRandomKey(clothingMap);
  const accessory = selectRandomKey(accessoryMap);
  const graphic = selectRandomKey(graphicsMap);
  const hat = selectRandomKey(hatMap);
  const body = selectRandomKey(bodyMap);

  const hairColor = selectRandomKey(theme.colors.hair);
  const clothingColor = selectRandomKey(theme.colors.clothing);
  const circleColor = selectRandomKey(theme.colors.bgColors);
  const lipColor = selectRandomKey(theme.colors.lipColors);
  const hatColor = selectRandomKey(theme.colors.clothing);
  const faceMaskColor = selectRandomKey(theme.colors.clothing);

  const mask = true;
  const faceMask = false;
  const lashes = Math.random() > 0.5;
  return (
    <div className={className}>
      <BigHead
        accessory={accessory}
        body={body}
        circleColor={circleColor}
        clothing={clothing}
        clothingColor={clothingColor}
        eyebrows={eyebrows}
        eyes={eyes}
        facialHair={facialHair}
        graphic={graphic}
        hair={hair}
        hairColor={hairColor}
        hat={hat}
        hatColor={hatColor}
        lashes={lashes}
        lipColor={lipColor}
        mask={mask}
        faceMaskColor={faceMaskColor}
        faceMask={faceMask}
        mouth={mouth}
        skinTone={skinTone}
      />
    </div>
  );
};

export const AvatarMemo = memo(Avatar);
