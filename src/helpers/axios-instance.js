import axios from "axios";
import Cookies from "js-cookie";
import { getApiURL } from "./baseURL";
const client = axios.create({
  baseURL: getApiURL(),
});

export const setAuthorizationHeader = () => {
  const token = Cookies.get("token");

  if (token) {
    client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete client.defaults.headers.common["Authorization"];
  }
};

// Set the initial authorization header
setAuthorizationHeader();

// Add an interceptor to update the authorization header before each request
client.interceptors.request.use((config) => {
  setAuthorizationHeader();
  return config;
});

export const request = ({ ...options }) => {
  const onSuccess = (response) => {
    return response;
  };
  const onError = (error) => {
    return error;
  };
  return client(options).then(onSuccess).catch(onError);
};
