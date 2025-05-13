import { FaRegCalendarCheck } from "react-icons/fa";
import { FaRightToBracket, FaUserPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Tarunno.png";
import { getBanglaDate } from "../../utils/getBanglaDate";
import { getBanglaHijriDate } from "../../utils/getBanglaHijriDate";

const Header = () => {
  const today = new Date();

  const engDay = today.toLocaleDateString("en-US", { weekday: "long" });
  const engDate = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const todayIso = today.toISOString().split("T")[0];
  const todayBangla = getBanglaDate(todayIso);
  const hijriDate = getBanglaHijriDate(todayIso);

  const navigate = useNavigate();

  const handleGotoHome = () => navigate("/");
  const handleGoToLogin = () => navigate("/login");

  return (
    <div className="flex flex-col">
      {/* Top Bar: Date & Auth */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-2 px-3 py-2 bg-green-500 text-gray-100 text-sm">
        {/* Date Info */}
        <div className="flex flex-wrap items-center gap-2">
          <FaRegCalendarCheck />
          <span>{engDay} |</span>
          <span>{engDate} |</span>
          <span>{todayBangla} |</span>
          <span>{hijriDate}</span>
        </div>

        {/* Auth Links */}
        <div className="flex items-center gap-3 font-medium">
          <div
            className="flex items-center gap-1 cursor-pointer hover:underline"
            onClick={handleGoToLogin}
          >
            <FaRightToBracket />
            <span>Login</span>
          </div>
          <span>|</span>
          <div className="flex items-center gap-1 cursor-pointer hover:underline">
            <FaUserPlus />
            <span>Register</span>
          </div>
        </div>
      </div>

      {/* Header Body: Logo + Tagline */}
      <div className="flex flex-col md:flex-row justify-between items-center px-3 py-4 gap-4">
        {/* Logo Section */}
        <div className="cursor-pointer" onClick={handleGotoHome}>
          <img
            src={logo}
            alt="logo"
            className="w-[200px] h-auto sm:w-[150px] md:w-[200px] lg:w-[250px]"
          />
        </div>

        {/* Tagline or Right Content */}
        <div className="bg-gray-200 w-full md:w-1/2 flex justify-center items-center py-2 px-4 rounded-md h-[100px]">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-700 text-center">
            Event Management
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
