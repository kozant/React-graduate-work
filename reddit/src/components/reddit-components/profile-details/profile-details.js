import React, { Component } from "react";
import { withService } from "../../../hocs/withService";

import "./profile-details.css";

const profileDetails = ({ itemId, dataService }) => {
  const { getArticle } = dataService;
  return <ItemDetails itemId={itemId} getData={getArticle} />;
};

class ItemDetails extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId } = this.props;
    if (!itemId) {
      return;
    }
    this.props.getData(itemId).then(item => {
      this.setState({ data: item });
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img className="user-img" src={data.image} />
                <h4>{data.author}</h4>
                <p></p>
                <div>
                  <button className="btn btn-sm action-btn btn-outline-secondary">
                    <i className="ion-plus-round"></i> &nbsp; Follow{" "}
                    {data.author}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const ProfileDetails = withService(profileDetails);

export { ProfileDetails };

{
  /* <a
                  class="btn btn-sm btn-outline-secondary action-btn"
                  href="/settings"
                  hidden=""
                >
                  <i class="ion-gear-a"></i> Edit Profile Settings
                </a> */
}
