export default class DataService {
  _apiBase = "https://conduit.productionready.io/api";

  getResource = async url => {
    const res = await fetch(`${this._apiBase}${url}`);

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
