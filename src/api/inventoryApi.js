import axios from "axios";

const apiMutation = axios.create({
  baseURL: import.meta.env.VITE_API_URL_2,
});

export default apiMutation;