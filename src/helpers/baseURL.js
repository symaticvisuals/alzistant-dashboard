const getBaseURL = () => {
  if (import.meta.env.VITE_ENV === "local") {
    return import.meta.env.VITE_BASE_URL_LOCAL;
  }
  console.log(process.env.NODE_ENV);
  switch (process.env.NODE_ENV) {
    case "development":
      return import.meta.env.VITE_BASE_URL_DEV;
    case "prod":
      return import.meta.env.VITE_BASE_URL_PROD;
    default:
      return "http://localhost:3005";
  }
};

export const getApiURL = (url) => {
  if (url) {
    return getBaseURL() + url;
  }
  return getBaseURL();
};
