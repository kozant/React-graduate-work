const _apiBase = "https://conduit.productionready.io/api";

const postRequest = async (url, body) => {
  return fetch(`${_apiBase}${url}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export const signUp = async (body) => {
  const res = await postRequest(`/users`, body);
  return {
    data: await res.json(),
    status: res.status,
  };
};

export const signIn = async (body) => {
  const res = await postRequest(`/users/login`, body);
  return {
    data: await res.json(),
    status: res.status,
  };
};
