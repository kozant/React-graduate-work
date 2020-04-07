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

export const getProfile = async (name, token) => {
  const res = await getResource(`/profiles/${name}`, token);
  const data = await res.json();
  return _transformProfile(data.profile);
};

export const editProfile = async (user, token) => {
  const res = await fetch(`${_apiBase}/user`, {
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

const _transformProfile = (profile) => {
  return {
    username: profile.username,
    bio: profile.bio,
    image: profile.image,
    following: profile.following,
  };
};
