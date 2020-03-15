const config = {
  defaultBranch:
    process.env.NODE_ENV === "development" ? 1 : process.env.DEFAULT_BRANCH,
  hostName:
    process.env.NODE_ENV === "development"
      ? "localhost"
      : process.env.HOST_NAME,
  apiPort:
    process.env.NODE_ENV === "development"
      ? 18451
      : process.env.DEFAULT_API_PORT,
  apiVersioning:
    process.env.NODE_ENV === "development"
      ? "v1"
      : process.env.DEFAULT_API_VERSIONING,
  pageSize:
    process.env.NODE_ENV === "development" ? 10 : process.env.DEFAULT_PAGE_SIZE
};

export default config;
