const _apiBase = "https://conduit.productionready.io/api";

export const getRequest = async (url, token) => {
  const headers = {};
  if (token) {
    headers.authorization = `Token ${token}`;
  }

  const res = await fetch(`${_apiBase}${url}`, {
    method: "GET",
    headers,
  });
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`);
  }
  return res.json();
};

export const postRequest = async (url, token, body) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (token) {
    headers.authorization = `Token ${token}`;
  }
  const res = await fetch(`${_apiBase}${url}`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`);
  }
  return await res;
};

export const putRequest = async (url, token, body) => {
  const res = await fetch(`${_apiBase}${url}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Token ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`);
  }
  return await res;
};

export const deleteRequest = async (url, token) => {
  const res = await fetch(`${_apiBase}${url}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Token ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`);
  }
  return res;
};