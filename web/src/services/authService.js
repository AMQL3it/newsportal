import apiService from "./apiService"; // Generic axios wrapper

const authService = {
  codeSending: (data) => apiService.create("auth/otp/send", data),
  codeVerify: (data) => apiService.create("auth/otp/verify", data),
  //   delete: (id) => apiService.deleteById("posts", id),
};

export default authService;
