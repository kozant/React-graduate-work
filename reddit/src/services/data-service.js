export default class DataService {
  _apiBase = "https://conduit.productionready.io/api";

  getResource = async url => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  };

  getResourceWithToken = async (url, token) => {
    const res = await fetch(`${this._apiBase}${url}`, {
      method: "GET",
      headers: {
        authorization: `Token ${token}`
      }
    });

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  };

  signUp = async user => {
    const res = await fetch(`${this._apiBase}/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    return {
      data: await res.json(),
      status: res.status
    };
  };

  signIn = async user => {
    const res = await fetch(`${this._apiBase}/users/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    return {
      data: await res.json(),
      status: res.status
    };
  };

  changeUserInfo = async (user, token) => {
    const res = await fetch(`${this._apiBase}/user`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Token ${token}`
      },
      body: JSON.stringify(user)
    });

    return {
      data: await res.json(),
      status: res.status
    };
  };

  postArticle = async (article, token) => {
    const res = await fetch(`${this._apiBase}/articles/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Token ${token}`
      },
      body: JSON.stringify(article)
    });

    return {
      data: await res.json(),
      status: res.status
    };
  };

  Like = async (slug, token, method) => {
    const res = await fetch(`${this._apiBase}/articles/${slug}/favorite`, {
      method: `${method}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Token ${token}`
      }
    });
    return res.status;
  };

  getAllArticles = async ({ limit, offset }) => {
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

  getProfile = async name => {
    const { profile } = await this.getResource(`/profiles/${name}`);
    return this._transformProfile(profile);
  };

  getUser = async () => {
    const res = await this.getResourse(`/user`);
    return res;
  };

  getYourArticles = async ({ limit, offset, token }) => {
    const res = await this.getResourceWithToken(
      `/articles/feed?limit=${limit}&offset=${offset}`,
      token
    );
    return {
      articles: res.articles.map(this._transformArticle),
      articlesCount: res.articlesCount
    };
  };

  getArticlesWithTag = async ({ limit, offset, tag }) => {
    const res = await this.getResource(
      `/articles?tag=${tag}&limit=${limit}&offset=${offset}`
    );
    return {
      articles: res.articles.map(this._transformArticle),
      articlesCount: res.articlesCount
    };
  };

  getAuthorArticles = async ({ author, limit, offset }) => {
    const res = await this.getResource(
      `/articles?author=${author}&limit=${limit}&offset=${offset}`
    );
    return {
      articles: res.articles.map(this._transformArticle),
      articlesCount: res.articlesCount
    };
  };

  getFavouritedArticles = async ({ author, limit, offset }) => {
    const res = await this.getResource(
      `/articles?favorited=${author}&limit=${limit}&offset=${offset}`
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

  _transformProfile = profile => {
    return {
      username: profile.username,
      bio: profile.bio,
      image: profile.image,
      following: profile.following
    };
  };
}
