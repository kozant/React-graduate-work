const _apiBase = "https://conduit.productionready.io/api";

const getResource = async (url, token) => {
  const headers = {};
  if (token) {
    headers.authorization = `Token ${token}`;
  }

  return fetch(`${_apiBase}${url}`, {
    method: "GET",
    headers,
  });
};

const postResource = async (url, body, token, method) => {
  return fetch(`${_apiBase}${url}`, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Token ${token}`,
    },
    body: JSON.stringify(body),
  });
};

export const getAllArticles = async ({ limit, offset, token }) => {
  const url = `/articles?&limit=${limit}&offset=${offset}`;
  const res = await getResource(url, token);
  const data = await res.json();
  return {
    articles: data.articles.map(_transformArticle),
    articlesCount: data.articlesCount,
  };
};

export const getYourArticles = async ({ limit, offset, token }) => {
  const url = `/articles/feed?limit=${limit}&offset=${offset}`;
  const res = await getResource(url, token);
  const data = await res.json();
  return {
    articles: data.articles.map(_transformArticle),
    articlesCount: data.articlesCount,
  };
};

export const getArticlesWithTag = async ({ limit, offset, tag, token }) => {
  const url = `/articles?tag=${tag}&limit=${limit}&offset=${offset}`;
  const res = await getResource(url, token);
  const data = await res.json();
  return {
    articles: data.articles.map(_transformArticle),
    articlesCount: data.articlesCount,
  };
};

export const getFavouritedArticles = async ({
  author,
  limit,
  offset,
  token,
}) => {
  const url = `/articles?favorited=${author}&limit=${limit}&offset=${offset}`;
  const res = await getResource(url, token);
  const data = await res.json();
  return {
    articles: data.articles.map(_transformArticle),
    articlesCount: data.articlesCount,
  };
};

export const getAuthorArticles = async ({ author, limit, offset, token }) => {
  const url = `/articles?author=${author}&limit=${limit}&offset=${offset}`;
  const res = await getResource(url, token);
  const data = await res.json();
  return {
    articles: data.articles.map(_transformArticle),
    articlesCount: data.articlesCount,
  };
};

export const getArticle = async (slug) => {
  const res = await getResource(`/articles/${slug}`);
  const data = await res.json();
  return _transformArticle(data.article);
};

export const postArticle = async (article, token) => {
  const res = await postResource(`/articles/`, article, token, "POST");
  return {
    data: await res.json(),
    status: res.status,
  };
};

export const editArticle = async (article, token, slug) => {
  const res = await postResource(`/articles/${slug}`, article, token, "PUT");
  return {
    data: await res.json(),
    status: res.status,
  };
};

export const deleteArticle = async (slug, token) => {
  await fetch(`${_apiBase}/articles/${slug}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Token ${token}`,
    },
  });
};

export const getAllPopularTags = async () => {
  const res = await getResource(`/tags`);
  const data = await res.json();
  return data.tags;
};

const _transformArticle = (article) => {
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
