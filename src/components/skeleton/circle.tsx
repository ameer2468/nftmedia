import React from "react";
import ContentLoader from "react-content-loader";

interface props {
  height?: number | string;
  width?: number | string;
}

const Circle = ({ height, width }: props) => (
  <ContentLoader
    speed={2}
    width={width || 100}
    style={{ width: "100%" }}
    height={height || 100}
    viewBox={`0 0 ${width} ${height}`}
    backgroundColor="#DFDFDF"
    foregroundColor="#ecebeb"
  >
    <circle cx="51" cy="51" r="41" />
  </ContentLoader>
);

export default Circle;
