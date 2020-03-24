import React, { Component } from "react";
import { withService } from "../../hocs/withService";
import { Link } from "react-router-dom";

import "./article-details.css";

const articleDetails = ({ itemId, dataService }) => {
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
    console.log(data);

    // const elements = data.tagList.map((item, index) => {
    //   return (
    //     <li key={index} className="tag-default tag-pill tag-outline">
    //       {item}
    //     </li>
    //   );
    // });
    // console.log(elements);

    return (
      <div>
        <div className="banner">
          <div className="container">
            <h1>{data.title}</h1>
            <div>
              <div className="article-meta">
                <Link to={`/profile/${data.slug}`}>
                  <img src={data.image} />
                </Link>
                <div className="info">
                  <Link to={`/profile/${data.slug}`} className="author">
                    {data.author}
                  </Link>
                  <span className="date">{data.updatedAt}</span>
                </div>
                <span>
                  <button className="btn btn-sm action-btn btn-outline-secondary">
                    <i className="ion-plus-round"></i>Follow {data.author}
                  </button>
                  <button className="btn btn-sm btn-outline-primary">
                    <i className="ion-heart"></i> Favorite Article
                    <span className="counter">{data.favoritesCount}</span>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="container row article-content">
          <div className="col-md-12">
            <div>
              <p>{data.body}</p>
            </div>
            {/* <ul className="tag-list">{elements}</ul> */}
          </div>
        </div>
        <hr></hr>
      </div>
    );
  }
}

const ArticleDetails = withService(articleDetails);

export { ArticleDetails };

{
  /* <span className="hidden">
                  <a className="btn btn-sm btn-outline-secondary">
                    <i className="ion-edit"></i> Edit Article
                  </a>
                  <button className="btn btn-sm btn-outline-danger">
                    <i className="ion-trash-a"></i> Delete Article
                  </button>
                </span> */
}
