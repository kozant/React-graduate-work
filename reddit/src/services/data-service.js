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
      `/articles?limit=${limit}&offset=${offset}`
    );
    return res.articles.map(this._transformArticle);
  };

  getArticlesCount = async () => {
    const res = await this.getResource(`/articles`);
    return res.articlesCount;
  };

  _transformArticle = article => {
    return {
      title: article.title,
      body: article.body,
      author: article.author.username,
      image: article.author.image,
      updatedAt: article.updatedAt
    };
  };
}
