import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Secure_login.gif";
import authService from "../services/authService";
import SweetAlert from "../utils/SweetAlert";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (username && password) {
        const response = await authService.codeSending({
          identifier: username,
          password,
        });

        if (response.success) {
          navigate("/varification", { state: { identifier: username } });
        } else {
          SweetAlert.errorAlert(response.message);
        }
      } else {
        alert("Please fill in both fields.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="max-w-xs text-center border border-gray-300 rounded shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
      <img src={logo} alt="Login Illustration" className="w-64 mx-auto mt-2" />
      <div className="px-5 pb-5 pt-1">
        <h3 className="text-lg font-semibold mb-3">Sign in</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Username or email address"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-2 py-1 text-sm border-b border-gray-300 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-2 py-1 text-sm border-b border-gray-300 focus:outline-none"
          />
          <button
            type="submit"
            className="px-2 py-1 text-sm font-medium bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
