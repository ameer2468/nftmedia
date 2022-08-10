import React from "react";
import ContentLoader from "react-content-loader";

const Circle = (props: any) => (
  <ContentLoader
    speed={2}
    width={100}
    height={100}
    viewBox="0 0 100 100"
    backgroundColor="#DFDFDF"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="51" cy="51" r="41" />
  </ContentLoader>
);

export default Circle;
