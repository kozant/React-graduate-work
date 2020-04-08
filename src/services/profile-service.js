import { getRequest, postRequest, putRequest, deleteRequest } from "./requests";

export const getProfile = async (name, token) => {
  const res = await getRequest(`/profiles/${name}`, token);
  return res.profile;
};

export const editProfile = async (user, token) => {
  const res = await putRequest(`/user`, user, token);
  return {
    data: await res.json(),
    status: res.status,
  };
};

export const follow = async (author, token) => {
  await postRequest(`/profiles/${author}/follow`, token);
};

export const unfollow = async (author, token) => {
  await deleteRequest(`/profiles/${author}/follow`, token);
};
