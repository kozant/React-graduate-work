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
  return await res.json();
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

  const objectData = {
    data: await res.json(),
    status: res.status,
  };

  if (!res.ok) {
    throw objectData;
  }

  return objectData;
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

  const objectData = {
    data: await res.json(),
    status: res.status,
  };

  if (!res.ok) {
    throw objectData;
  }

  return objectData;
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
  return await res.json();
};
