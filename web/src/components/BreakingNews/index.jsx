import React, { useState, useEffect } from "react";
import styles from "./BreakingNews.module.css";
import { FaBullhorn, FaArrowUp, FaArrowDown } from "react-icons/fa";

const BreakingNews = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const news = [
        { title: "Sports", headline: "Argentina wins Copa America in thrilling final match!" },
        { title: "Travels", headline: "Top 10 places to visit in 2025 revealed by Lonely Planet." },
        { title: "Politics", headline: "Government passes new budget reform bill for education." },
    ];

    const newsTitleColors = {
        Sports: "green",
        Travels: "blue",
        Politics: "red",
    };

    const handlePrev = () => {
        setCurrentIndex(prev => (prev === 0 ? news.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex(prev => (prev === news.length - 1 ? 0 : prev + 1));
    };

    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const currentNews = news[currentIndex];

    return (
        <div className={styles.container}>
            <span className={styles.header}>
                <FaBullhorn />
                <span className={styles.text}>Breaking News</span>
            </span>
            <div className={styles.content}>
                <div className={styles.newsItem}>
                    <span
                        className={styles.newsCategory}
                        style={{ backgroundColor: newsTitleColors[currentNews.title] }}
                    >
                        {currentNews.title}
                    </span>
                    <span className={styles.newsHeadline}>{currentNews.headline}</span>
                </div>
                <div className={styles.navButtons}>
                    <button onClick={handlePrev}>
                        <FaArrowUp />
                    </button>
                    <button onClick={handleNext}>
                        <FaArrowDown />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BreakingNews;
