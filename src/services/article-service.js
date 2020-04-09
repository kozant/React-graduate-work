import { getRequest, postRequest, putRequest, deleteRequest } from "./requests";

export const getAllArticles = async ({ limit, offset, token }) => {
  const url = `/articles?&limit=${limit}&offset=${offset}`;
  const res = await getRequest(url, token);
  return {
    articles: res.articles.map(_transformArticle),
    articlesCount: res.articlesCount,
  };
};

export const getYourArticles = async ({ limit, offset, token }) => {
  const url = `/articles/feed?limit=${limit}&offset=${offset}`;
  const res = await getRequest(url, token);
  return {
    articles: res.articles.map(_transformArticle),
    articlesCount: res.articlesCount,
  };
};

export const getArticlesWithTag = async ({ limit, offset, tag, token }) => {
  const url = `/articles?tag=${tag}&limit=${limit}&offset=${offset}`;
  const res = await getRequest(url, token);
  return {
    articles: res.articles.map(_transformArticle),
    articlesCount: res.articlesCount,
  };
};

export const getFavouritedArticles = async ({
  author,
  limit,
  offset,
  token,
}) => {
  const url = `/articles?favorited=${author}&limit=${limit}&offset=${offset}`;
  const res = await getRequest(url, token);
  return {
    articles: res.articles.map(_transformArticle),
    articlesCount: res.articlesCount,
  };
};

export const getAuthorArticles = async ({ author, limit, offset, token }) => {
  const url = `/articles?author=${author}&limit=${limit}&offset=${offset}`;
  const res = await getRequest(url, token);
  return {
    articles: res.articles.map(_transformArticle),
    articlesCount: res.articlesCount,
  };
};

export const getArticle = async (slug) => {
  const res = await getRequest(`/articles/${slug}`);
  return _transformArticle(res.article);
};

export const postArticle = async (article, token) => {
  return await postRequest(`/articles/`, token, article);
};

export const editArticle = async (article, token, slug) => {
  return await putRequest(`/articles/${slug}`, token, article);
};

export const deleteArticle = async (slug, token) => {
  await deleteRequest(`/articles/${slug}`, token);
};

export const getAllPopularTags = async () => {
  const res = await getRequest(`/tags`);
  return res.tags;
};

export const like = async (slug, token) => {
  await postRequest(`/articles/${slug}/favorite`, token);
};

export const unlike = async (slug, token) => {
  await deleteRequest(`/articles/${slug}/favorite`, token);
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
