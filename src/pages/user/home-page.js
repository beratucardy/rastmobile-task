import React from "react";
import UserTemplate from "../../templates/user-template";
import SocialMediaDatagrid from "../../components/user/social-media/social-media-datagrid";

const HomePage = () => {
  return (
    <UserTemplate>
      <SocialMediaDatagrid />
    </UserTemplate>
  );
};

export default HomePage;
