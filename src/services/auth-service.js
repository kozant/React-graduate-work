import { postRequest } from "./requests";

export const signUp = async (body) => {
  const res = await postRequest(`/users`, null, body);
  return {
    data: await res.json(),
    status: res.status,
  };
};

export const signIn = async (body) => {
  const res = await postRequest(`/users/login`, null, body);
  return {
    data: await res.json(),
    status: res.status,
  };
};
