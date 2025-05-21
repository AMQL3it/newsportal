import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp, FaBullhorn } from "react-icons/fa";

const BreakingNews = ({ bnews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const newsTitleColors = {
    International: "bg-green-600",
    Campus: "bg-blue-600",
    Opinion: "bg-red-600",
    Literature: "bg-yellow-600",
    Blog: "bg-pink-600",
    National: "bg-indigo-600",
    Uncategorized: "bg-gray-600",
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? bnews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === bnews.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  });

  const currentNews = bnews[currentIndex];

  return (
    <div className="flex items-stretch h-12 sm:h-auto mx-2">
      {/* Left Section: Breaking News Label */}
      <div className="flex items-center bg-red-500 text-white px-3 text-xs sm:text-sm font-medium gap-2 min-w-[40px] sm:min-w-[140px]">
        <FaBullhorn />
        <span className="hidden sm:inline">Breaking News</span>
      </div>

      {/* Right Section: News Content & Arrows */}
      <div className="flex-1 flex justify-between items-center px-3 border border-gray-300 bg-white overflow-hidden">
        {/* News Info */}
        <div className="flex items-center gap-2 text-xs sm:text-sm w-full overflow-hidden">
          <span
            className={`rounded px-2 py-1 text-white text-[10px] sm:text-xs font-semibold ${
              newsTitleColors[currentNews?.category?.name || "Uncategorized"]
            }`}
          >
            {currentNews?.category?.name ?? "Uncategorized"}
          </span>
          <span className="text-gray-700 font-medium truncate w-full">
            {currentNews?.title}
          </span>
        </div>

        {/* Navigation Arrows */}
        <div className="flex flex-row gap-2 ml-2 shrink-0">
          <button
            onClick={handlePrev}
            className="hover:text-black bg-gray-200 p-1 sm:p-2 text-xs sm:text-sm rounded"
          >
            <FaArrowUp />
          </button>
          <button
            onClick={handleNext}
            className="hover:text-black bg-gray-200 p-1 sm:p-2 text-xs sm:text-sm rounded"
          >
            <FaArrowDown />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;
