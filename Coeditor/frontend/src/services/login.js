import axios from "axios";
import config from "../config";
const baseURL = `${config.base_url}/api/login`;
const login = async (credentials) => {
  const response = await axios.post(baseURL, credentials);
  return response.data;
};

export default { login };
