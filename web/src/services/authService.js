import axios from "axios";
const BASE_URL = "http://localhost:5000/api";
const getAuthHeaders = () => ({
  headers: {
    // Authorization: `Bearer ${getToken()}`
  },
});

const authService = {
  // codeSending: (data) => apiService.create("auth/otp/send", data),
  // codeVerify: (data) => apiService.create("auth/otp/verify", data),
  login: async (data, config = {}) => {
    const res = await axios.post(`${BASE_URL}/auth/login`, data, {
      ...getAuthHeaders(),
      ...config,
    });
    // console.log(res.data);

    return res.data;
  },

  codeSending: async (data, config = {}) => {
    const res = await axios.post(`${BASE_URL}/auth/otp/send`, data, {
      ...getAuthHeaders(),
      ...config,
    });
    return res.data;
  },
  codeVerify: async (data, config = {}) => {
    const res = await axios.post(`${BASE_URL}/auth/otp/verify`, data, {
      ...getAuthHeaders(),
      ...config,
    });
    return res.data;
  },

  //   delete: (id) => apiService.deleteById("posts", id),
};

export default authService;
