import axios from "axios";
import config from "../config";
const baseUrl = `${config.base_url}/api/room`;
const getOneRoom = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const getRooms = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default { getRooms, getOneRoom };
