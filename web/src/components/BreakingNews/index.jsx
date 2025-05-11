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
    <div className="flex justify-between items-center h-10 mx-2 py-2">
      {/* Header */}
      <div className="flex items-center bg-yellow-500 text-white px-4 py-1 font-medium text-sm gap-2">
        <FaBullhorn />
        <span className="hidden md:inline">Breaking News</span>
      </div>

      {/* News Content */}
      <div className="flex-1 flex justify-between items-center gap-2 px-4 py-1 border border-gray-300 overflow-hidden">
        {/* News Item */}
        <div className="flex items-center gap-3 text-sm">
          <span
            className={`rounded px-2 py-1 text-white font-semibold ${
              newsTitleColors[currentNews.title]
            }`}
          >
            {currentNews.title}
          </span>
          <span className="text-gray-700 font-medium">
            {currentNews.headline}
          </span>
        </div>

        {/* Nav Buttons */}
        <div className="flex flex-row space-y-1 text-gray-500">
          <button onClick={handlePrev} className="hover:text-black">
            <FaArrowUp />
          </button>
          <button onClick={handleNext} className="hover:text-black">
            <FaArrowDown />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;
