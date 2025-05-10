import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/Two_factor_authentication.gif";
import authService from "../services/authService";
import SweetAlert from "../utils/SweetAlert";

const Varification = () => {
  const location = useLocation();
  const identifier = location.state?.identifier;
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (code) {
        const response = await authService.codeVerify({
          identifier,
          code,
        });

        if (response.success) {
          localStorage.setItem("token", response.token);
          navigate("/dashboard");
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
      <img src={logo} alt="Verification" className="w-64 mx-auto mt-2" />
      <div className="px-5 pb-5 pt-1">
        <h3 className="text-lg font-semibold mb-3">Verification Code</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Phone Number or Email"
            value={identifier}
            disabled
            readOnly
            className="px-2 py-1 text-sm border-b border-gray-300 focus:outline-none"
          />
          <input
            type="text"
            placeholder="6 digit code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="px-2 py-1 text-sm border-b border-gray-300 focus:outline-none"
          />
          <button
            type="submit"
            className="px-2 py-1 text-sm font-medium bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default Varification;
