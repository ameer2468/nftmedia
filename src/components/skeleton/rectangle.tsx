import React from "react";
import ContentLoader from "react-content-loader";

interface props {
  height?: number | string;
  width?: number | string;
}

const Rectangle = ({ height, width }: props) => (
  <ContentLoader
    speed={2}
    width={width || "700"}
    height={height || "50"}
    style={{ width: "100%" }}
    viewBox={`0 0 ${width || "700"} ${height || "50"}`}
    backgroundColor="#DFDFDF"
    foregroundColor="#ecebeb"
  >
    <rect
      x="0"
      y="0"
      rx="1"
      ry="1"
      width={`${width || "700"}`}
      height={height || "50"}
    />
  </ContentLoader>
);

export default Rectangle;
