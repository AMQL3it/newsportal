import React, { useState, useEffect } from "react";
import style from "../styles/BreakingNews.module.css";

const BreakingNews = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    // const [news, setNews] = useState([
    //     {
    //         title: "Sports",
    //         headline: "Rasel ipsum dolor sit amet consectetur adipisicing elit.",
    //     },
    //     {
    //         title: "Travels",
    //         headline: "Anis ipsum dolor sit amet consectetur adipisicing elit.",
    //     },
    //     {
    //         title: "Politics",
    //         headline: "Atiq ipsum dolor sit amet consectetur adipisicing elit.",
    //     },
    // ]);

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
        Sports: "green",
        Travels: "blue",
        Politics: "red",
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
    
        return () => clearInterval(timer); // cleanup on unmount
    });
    
    const currentNews = news[currentIndex];

    return (
        <div className={style.breakingNews}>
            <span className={style.newsHeader}>Breaking News</span>
            <div className={style.newsLine}>
                <div className={style.news}>
                    <span className={style.newsTitle} style={{ backgroundColor: newsTitleColors[currentNews.title] }}>
                        {currentNews.title} 
                    </span>
                    <span className={style.newsHeadline}>
                        {currentNews.headline}
                    </span>
                </div>
                <div className={style.arrow}>
                    <ul>
                        <li>
                            <button onClick={handlePrev}>
                                <i className="fa fa-arrow-up"></i>
                            </button>   
                        </li>
                        <li>
                            <button onClick={handleNext}>
                                <i className="fa fa-arrow-down"></i>
                            </button>
                        </li>    
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BreakingNews;