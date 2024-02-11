import axios from "axios";
import config from "../config";
const baseUrl = `${config.base_url}/api/users`;
const createUser = async (newObj) => {
  const response = await axios.post(baseUrl, newObj);
  return response.data;
};
const getUsers = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default { createUser, getUsers };
