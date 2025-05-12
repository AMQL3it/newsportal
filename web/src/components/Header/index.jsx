import { useEffect } from "react";
import { FaRegCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useBanglaDate } from "../../hooks/useBanglaDate";
import { useHijriDate } from "../../hooks/useHijriDate";
import Navbar from "../Navbar";

const Header = () => {
  const navigate = useNavigate();
  const today = new Date();
  const day = today.toLocaleDateString("en-US", { weekday: "long" });
  const date = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const todayFormatted = today.toISOString().split("T")[0];
  const [banglaDate, convertBanglaDate] = useBanglaDate(todayFormatted);
  const [hijriDate, convertIslamicDate] = useHijriDate(todayFormatted);

  useEffect(() => {
    convertBanglaDate();
    convertIslamicDate();
  }, [convertBanglaDate, convertIslamicDate]);

  const handleGotoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col">
      {/* Header Body */}
      <div className="flex justify-between items-center px-3 py-1 gap-4 flex-wrap">
        {/* Logo Section */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={handleGotoHome}
        >
          <img
            src={logo}
            alt="logo"
            className="w-[50px] h-[50px] rounded-full border-2 border-[var(--header-body-color)] md:w-10 md:h-10 sm:w-9 sm:h-9"
          />
          <h1 className="text-xl md:text-lg sm:text-base font-semibold">
            News <span className="text-[var(--header-body-color)]">Portal</span>
          </h1>
        </div>

        {/* Date Section */}
        <div className="flex items-center gap-3 sm:gap-2">
          {/* Icon */}
          <div className="text-[65px] md:text-[45px] sm:text-[35px] text-gray-700">
            <FaRegCalendarCheck />
          </div>

          {/* Date Content */}
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="text-[20px] font-medium md:text-[16px] sm:text-[14px]">
              {day}
            </div>
            <div className="flex flex-col items-center justify-center gap-1 text-[13px] md:text-[12px] sm:text-[11px]">
              <span>{date}</span>
              <span>{banglaDate}</span>
              <span>{hijriDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <Navbar />
    </div>
  );
};

export default Header;
