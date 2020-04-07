export default class DataService {
  _apiBase = "https://conduit.productionready.io/api";

  getResource = async (url) => {
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
        authorization: `Token ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  };

  signUp = async (user) => {
    const res = await fetch(`${this._apiBase}/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    return {
      data: await res.json(),
      status: res.status,
    };
  };

  signIn = async (user) => {
    const res = await fetch(`${this._apiBase}/users/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    return {
      data: await res.json(),
      status: res.status,
    };
  };

  changeUserInfo = async (user, token) => {
    const res = await fetch(`${this._apiBase}/user`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Token ${token}`,
      },
      body: JSON.stringify(user),
    });

    return {
      data: await res.json(),
      status: res.status,
    };
  };

  postArticle = async (article, token) => {
    const res = await fetch(`${this._apiBase}/articles/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Token ${token}`,
      },
      body: JSON.stringify(article),
    });

    return {
      data: await res.json(),
      status: res.status,
    };
  };

  editArticle = async (article, token, slug) => {
    const res = await fetch(`${this._apiBase}/articles/${slug}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Token ${token}`,
      },
      body: JSON.stringify(article),
    });

    return {
      data: await res.json(),
      status: res.status,
    };
  };

  Like = async (slug, token, method) => {
    const res = await fetch(`${this._apiBase}/articles/${slug}/favorite`, {
      method: `${method}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Token ${token}`,
      },
    });
    return res.status;
  };

  Follow = async (author, token, method) => {
    const res = await fetch(`${this._apiBase}/profiles/${author}/follow`, {
      method: `${method}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Token ${token}`,
      },
    });
    return res.status;
  };

  getAllArticles = async ({ limit, offset, token }) => {
    if (token) {
      const res = await this.getResourceWithToken(
        `/articles?&limit=${limit}&offset=${offset}`,
        token
      );
      return {
        articles: res.articles.map(this._transformArticle),
        articlesCount: res.articlesCount,
      };
    } else {
      const res = await this.getResource(
        `/articles?&limit=${limit}&offset=${offset}`
      );
      return {
        articles: res.articles.map(this._transformArticle),
        articlesCount: res.articlesCount,
      };
    }
  };

  getArticle = async (slug) => {
    const { article } = await this.getResource(`/articles/${slug}`);
    return this._transformArticle(article);
  };

  deleteArticle = async (slug, token) => {
    const res = await fetch(`${this._apiBase}/articles/${slug}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Token ${token}`,
      },
    });

    return res.status;
  };

  getProfile = async (name, token) => {
    if (token) {
      const { profile } = await this.getResourceWithToken(
        `/profiles/${name}`,
        token
      );
      return this._transformProfile(profile);
    } else {
      const { profile } = await this.getResource(`/profiles/${name}`);
      return this._transformProfile(profile);
    }
  };

  getYourArticles = async ({ limit, offset, token }) => {
    const res = await this.getResourceWithToken(
      `/articles/feed?limit=${limit}&offset=${offset}`,
      token
    );
    return {
      articles: res.articles.map(this._transformArticle),
      articlesCount: res.articlesCount,
    };
  };

  getArticlesWithTag = async ({ limit, offset, tag, token }) => {
    if (token) {
      const res = await this.getResourceWithToken(
        `/articles?tag=${tag}&limit=${limit}&offset=${offset}`,
        token
      );
      return {
        articles: res.articles.map(this._transformArticle),
        articlesCount: res.articlesCount,
      };
    } else {
      const res = await this.getResource(
        `/articles?tag=${tag}&limit=${limit}&offset=${offset}`
      );
      return {
        articles: res.articles.map(this._transformArticle),
        articlesCount: res.articlesCount,
      };
    }
  };

  getAuthorArticles = async ({ author, limit, offset, token }) => {
    if (token) {
      const res = await this.getResourceWithToken(
        `/articles?author=${author}&limit=${limit}&offset=${offset}`,
        token
      );
      return {
        articles: res.articles.map(this._transformArticle),
        articlesCount: res.articlesCount,
      };
    } else {
      const res = await this.getResource(
        `/articles?author=${author}&limit=${limit}&offset=${offset}`
      );
      return {
        articles: res.articles.map(this._transformArticle),
        articlesCount: res.articlesCount,
      };
    }
  };

  getFavouritedArticles = async ({ author, limit, offset, token }) => {
    if (token) {
      const res = await this.getResourceWithToken(
        `/articles?favorited=${author}&limit=${limit}&offset=${offset}`,
        token
      );
      return {
        articles: res.articles.map(this._transformArticle),
        articlesCount: res.articlesCount,
      };
    } else {
      const res = await this.getResource(
        `/articles?favorited=${author}&limit=${limit}&offset=${offset}`
      );
      return {
        articles: res.articles.map(this._transformArticle),
        articlesCount: res.articlesCount,
      };
    }
  };

  getAllPopularTags = async () => {
    const res = await this.getResource(`/tags`);
    return res.tags;
  };

  _transformArticle = (article) => {
    return {
      slug: article.slug,
      title: article.title,
      body: article.body,
      description: article.description,
      author: article.author.username,
      image: article.author.image,
      updatedAt: article.updatedAt,
      favorited: article.favorited,
      favoritesCount: article.favoritesCount,
      tagList: article.tagList,
    };
  };

  _transformProfile = (profile) => {
    return {
      username: profile.username,
      bio: profile.bio,
      image: profile.image,
      following: profile.following,
    };
  };
}
