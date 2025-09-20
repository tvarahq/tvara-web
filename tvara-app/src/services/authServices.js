import axios from "axios";

const API_URL = import.meta.env.VITE_TVARA_API_URL + "/auth";

const authService = {
  login: (data) => axios.post(`${API_URL}/signin`, data),
  register: (data) => axios.post(`${API_URL}/signup`, data),
};

export default authService;
