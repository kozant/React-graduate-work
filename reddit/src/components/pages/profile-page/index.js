import React from "react";
import { ProfileDetails } from "../../reddit-components/profile-details/profile-details";
import { withRouter } from "react-router-dom";

const ProfilePage = ({ match }) => {
  return <ProfileDetails itemId={match.params.slug} />;
};

export default withRouter(ProfilePage);
