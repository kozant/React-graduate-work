import React, { Component } from "react";
import { withService } from "../../hocs/withService";

//import "./article-details.css";

const profileDetails = ({ itemId, dataService }) => {
  const { getArticle } = dataService;
  return <ItemDetails itemId={itemId} getData={getArticle} />;
};

class ItemDetails extends Component {
  render() {
    return <div>Profile</div>;
  }
}

const ProfileDetails = withService(profileDetails);

export { ProfileDetails };
