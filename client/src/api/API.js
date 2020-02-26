import axios from "axios";
import BASE_URL from "./BaseURL";
export default axios.create({
  baseURL: BASE_URL,
  responseType: "json"
});
