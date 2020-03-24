export default class DataService {
  _apiBase = "https://conduit.productionready.io/api";

  getResource = async url => {
    const res = await fetch(`${this._apiBase}${url}`, {
      method: "GET",
      headers: {
        authorization:
          "Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ODc1ODIsInVzZXJuYW1lIjoia296YW50IiwiZXhwIjoxNTg5ODkxMjYxfQ.7BSQYjw-_mhHFTU9XWkbUYAG5oi-_dIHBhKmc0QQU4Y"
      }
    });

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  };

  getAllArticles = async (limit, offset) => {
    const res = await this.getResource(
      `/articles?&limit=${limit}&offset=${offset}`
    );
    return {
      articles: res.articles.map(this._transformArticle),
      articlesCount: res.articlesCount
    };
  };

  getArticle = async slug => {
    const { article } = await this.getResource(`/articles/${slug}`);
    return this._transformArticle(article);
  };

  getYourArticles = async (limit, offset) => {
    const res = await this.getResource(
      `/articles/feed?limit=${limit}&offset=${offset}`
    );
    return {
      articles: res.articles.map(this._transformArticle),
      articlesCount: res.articlesCount
    };
  };

  getArticlesWithTag = async (limit, offset, tag) => {
    const res = await this.getResource(
      `/articles?tag=${tag}&limit=${limit}&offset=${offset}`
    );
    return {
      articles: res.articles.map(this._transformArticle),
      articlesCount: res.articlesCount
    };
  };

  getAllPopularTags = async () => {
    const res = await this.getResource(`/tags`);
    return res.tags;
  };

  _transformArticle = article => {
    return {
      slug: article.slug,
      title: article.title,
      body: article.body,
      author: article.author.username,
      image: article.author.image,
      updatedAt: article.updatedAt,
      favoritesCount: article.favoritesCount,
      tagList: article.tagList
    };
  };
}
