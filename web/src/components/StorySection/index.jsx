import React, { useEffect, useRef, useState } from "react";
import styles from "./StorySection.module.css";
import StoryCard from "./StoryCard";
import { stories as mockStories } from "./storyData";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import TitleLine from "../General/TitleLine";

const StorySection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) =>
        prev >= mockStories.length - 1 ? 0 : prev + 1
      );
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleNext = () => {
    stopAutoSlide();
    setCurrentIndex((prev) =>
      prev >= mockStories.length - 1 ? 0 : prev + 1
    );
    startAutoSlide();
  };

  const handlePrev = () => {
    stopAutoSlide();
    setCurrentIndex((prev) =>
      prev <= 0 ? mockStories.length - 1 : prev - 1
    );
    startAutoSlide();
  };

  return (
    <div className={styles.storySlider}>
      <div
        className={styles.sliderInner}
        style={{
          transform: `translateX(-${currentIndex * (100 / mockStories.length)}%)`,
          width: `${mockStories.length * 100}%`,
        }}
      >
        {mockStories.map((story) => (
          <div
            key={story.id}
            className={styles.sliderItem}
            style={{ width: `${100 / mockStories.length}%` }}
          >
            <StoryCard story={story} handlePrev={handlePrev} handleNext={handleNext} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StorySection;
