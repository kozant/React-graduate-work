import { postRequest } from "./requests";

export const signUp = async (body) => {
  return await postRequest(`/users`, null, body);
};

export const signIn = async (body) => {
  return await postRequest(`/users/login`, null, body);
};
