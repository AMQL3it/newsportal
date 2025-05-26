import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/registration.svg";

const Registration = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  // Email validation function
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // BD phone number validation function
  const isValidBDPhone = (phone) => {
    return /^01[3-9]\d{8}$/.test(phone);
  };

  const passwordsMatch =
    userInfo.password === userInfo.confirmPassword ||
    userInfo.confirmPassword === "";
  const emailValid = isValidEmail(userInfo.email) || userInfo.email === "";
  const phoneValid = isValidBDPhone(userInfo.phone) || userInfo.phone === "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !passwordsMatch ||
      !isValidEmail(userInfo.email) ||
      !isValidBDPhone(userInfo.phone)
    ) {
      return;
    }

    console.log(userInfo);

    // API call and logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 dark:bg-[#1D1D1D] text-white">
      <div className="w-full max-w-xs text-center border border-gray-700 rounded-lg shadow-md bg-[#2C2C2C] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img
          src={logo}
          alt="Registration Illustration"
          className="w-40 m-4 mx-auto border border-gray-600 rounded shadow cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className="px-6 pb-6 pt-1">
          <h3 className="text-lg font-semibold mb-4 text-white">Sign Up</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Username */}
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={userInfo.username}
              onChange={handleChange}
              className="px-3 py-2 text-sm bg-[#1F1F1F] text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Email */}
            <>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={userInfo.email}
                onChange={handleChange}
                className={`px-3 py-2 text-sm bg-[#1F1F1F] text-white border ${
                  emailValid ? "border-gray-700" : "border-red-500"
                } rounded focus:outline-none ${
                  emailValid ? "focus:ring-green-500" : "focus:ring-red-500"
                } focus:ring-2`}
              />
              {!emailValid && (
                <p className="text-xs text-red-500 mt-1 text-left">
                  Invalid email address
                </p>
              )}
            </>

            {/* Phone */}
            <>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number (e.g. 017xxxxxxxx)"
                value={userInfo.phone}
                onChange={handleChange}
                className={`px-3 py-2 text-sm bg-[#1F1F1F] text-white border ${
                  phoneValid ? "border-gray-700" : "border-red-500"
                } rounded focus:outline-none ${
                  phoneValid ? "focus:ring-green-500" : "focus:ring-red-500"
                } focus:ring-2`}
              />
              {!phoneValid && (
                <p className="text-xs text-red-500 mt-1 text-left">
                  Invalid Bangladeshi phone number
                </p>
              )}
            </>

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userInfo.password}
              onChange={handleChange}
              className="px-3 py-2 text-sm bg-[#1F1F1F] text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Confirm Password */}
            <>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={userInfo.confirmPassword}
                onChange={handleChange}
                className={`px-3 py-2 text-sm bg-[#1F1F1F] text-white border ${
                  passwordsMatch ? "border-gray-700" : "border-red-500"
                } rounded focus:outline-none focus:ring-2 ${
                  passwordsMatch ? "focus:ring-green-500" : "focus:ring-red-500"
                }`}
              />
              {!passwordsMatch && userInfo.confirmPassword && (
                <p className="text-xs text-red-500 mt-1 text-left">
                  Passwords do not match
                </p>
              )}
            </>

            {/* Submit Button */}
            <button
              type="submit"
              className="px-3 py-2 text-sm font-medium bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
