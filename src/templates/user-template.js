import React from "react";
import Header from "../components/user/common/header/header";

const UserTemplate = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default UserTemplate;
