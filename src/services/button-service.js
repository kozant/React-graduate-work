const _apiBase = "https://conduit.productionready.io/api";

const clickButton = async (url, token, method) => {
  return fetch(`${_apiBase}${url}`, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Token ${token}`,
    },
  });
};

export const like = async (slug, token) => {
  const url = `/articles/${slug}/favorite`;
  await clickButton(url, token, "POST");
};

export const unlike = async (slug, token) => {
  const url = `/articles/${slug}/favorite`;
  await clickButton(url, token, "DELETE");
};

export const follow = async (author, token) => {
  const url = `/profiles/${author}/follow`;
  await clickButton(url, token, "POST");
};

export const unfollow = async (author, token) => {
  const url = `/profiles/${author}/follow`;
  await clickButton(url, token, "DELETE");
};
