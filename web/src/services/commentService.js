import axios from "axios";
const BASE_URL = "http://localhost:5000/api";

const commentService = {
  addComment: async (data) => {
    const res = await axios.post(`${BASE_URL}/comments`, data);
    return res.data;
  },

  addState: async (id, data) => {
    const res = await axios.put(`${BASE_URL}/posts/${id}/state`, data);
    return res.data;
  },

  // deleteComment: async (id) => {
  //   const res = await axios.delete(`${BASE_URL}/comments/${id}`);
  //   return res.data;
  // },
};

export default commentService;
