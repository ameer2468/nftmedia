import React from "react";

interface props {
  children: React.ReactNode;
}

const PageContainer = ({ children }: props) => {
  return <div className="pagecontainer w-full">{children}</div>;
};

export default PageContainer;
