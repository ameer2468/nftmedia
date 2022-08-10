import React from "react";
import ContentLoader from "react-content-loader";

const Rectangle = (props: any) => (
  <ContentLoader
    speed={2}
    width={700}
    height={50}
    style={{ width: "100%" }}
    viewBox="0 0 700 50"
    backgroundColor="#DFDFDF"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="14" y="11" rx="1" ry="1" width="700" height="50" />
  </ContentLoader>
);

export default Rectangle;
