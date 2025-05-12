import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp, FaBullhorn } from "react-icons/fa";

const BreakingNews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const news = [
    {
      title: "Sports",
      headline: "Argentina wins Copa America in thrilling final match!",
    },
    {
      title: "Travels",
      headline: "Top 10 places to visit in 2025 revealed by Lonely Planet.",
    },
    {
      title: "Politics",
      headline: "Government passes new budget reform bill for education.",
    },
  ];

  const newsTitleColors = {
    Sports: "bg-green-600",
    Travels: "bg-blue-600",
    Politics: "bg-red-600",
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? news.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === news.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  });

  const currentNews = news[currentIndex];

  return (
    <div className="flex items-stretch h-12 mx-2">
      {/* Header */}
      <div className="flex items-center bg-yellow-500 text-white px-4 text-sm font-medium gap-2">
        <FaBullhorn />
        <span className="hidden md:inline">Breaking News</span>
      </div>

      {/* News Content */}
      <div className="flex-1 flex justify-between items-center px-4 border border-gray-300 bg-white">
        {/* News Text */}
        <div className="flex items-center gap-3 text-sm overflow-hidden">
          <span
            className={`rounded px-2 py-1 text-white text-xs font-semibold ${
              newsTitleColors[currentNews.title]
            }`}
          >
            {currentNews.title}
          </span>
          <span className="text-gray-700 font-medium truncate">
            {currentNews.headline}
          </span>
        </div>

        {/* Arrow Buttons */}
        <div className="flex flex-row gap-3 rounded p-1">
          <button
            onClick={handlePrev}
            className="hover:text-black bg-gray-200 p-2"
          >
            <FaArrowUp />
          </button>
          <button
            onClick={handleNext}
            className="hover:text-black bg-gray-200 p-2"
          >
            <FaArrowDown />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;
