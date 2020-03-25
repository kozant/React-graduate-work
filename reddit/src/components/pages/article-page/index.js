import React from "react";
import { ArticleDetails } from "../../reddit-components/article-details/article-details";
import { withRouter } from "react-router-dom";

const ArticlePage = ({ match }) => {
  return <ArticleDetails itemId={match.params.slug} />;
};

export default withRouter(ArticlePage);
