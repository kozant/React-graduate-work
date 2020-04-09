import { getRequest, postRequest, putRequest, deleteRequest } from "./requests";

export const getProfile = async (name, token) => {
  const res = await getRequest(`/profiles/${name}`, token);
  return res.profile;
};

export const editProfile = async (user, token) => {
  return await putRequest(`/user`, token, user);
};

export const follow = async (author, token) => {
  await postRequest(`/profiles/${author}/follow`, token);
};

export const unfollow = async (author, token) => {
  await deleteRequest(`/profiles/${author}/follow`, token);
};
