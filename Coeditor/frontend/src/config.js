const config = {
  base_url:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_BASE_URL
      : "http://localhost:4001",
};
export default config;
