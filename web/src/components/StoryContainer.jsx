import React, { useEffect, useRef, useState } from "react";
import style from "../styles/StoryContainer.module.css";
import image from "../assets/background.png"; // Sample image

const mockStories = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Trending Gadget #${i + 1}`,
    tags: ["Gadget", "Tech"],
    date: "📅 July 17, 2023",
    author: "👤 DemoAdmin",
    image: image,
}));

const StoryContainer = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsPerView, setCardsPerView] = useState(4);
    const intervalRef = useRef(null);

    // Responsive card count
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width >= 1200) setCardsPerView(5);
            else if (width >= 768) setCardsPerView(4);
            else setCardsPerView(2);
        };

        handleResize(); // Initial
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Auto slide every 5 seconds
    useEffect(() => {
        startAutoSlide();
        return () => stopAutoSlide();
    }, [currentIndex, cardsPerView]);

    const startAutoSlide = () => {
        stopAutoSlide();
        intervalRef.current = setInterval(() => {
            handleNext();
        }, 5000);
    };

    const stopAutoSlide = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    const handlePrev = () => {
        stopAutoSlide();
        const newIndex = (currentIndex - cardsPerView + mockStories.length) % mockStories.length;
        setCurrentIndex(newIndex);
        startAutoSlide();
    };

    const handleNext = () => {
        stopAutoSlide();
        const newIndex = (currentIndex + cardsPerView) % mockStories.length;
        setCurrentIndex(newIndex);
        startAutoSlide();
    };

    const getVisibleStories = () => {
        const end = currentIndex + cardsPerView;
        if (end <= mockStories.length) return mockStories.slice(currentIndex, end);
        return [...mockStories.slice(currentIndex), ...mockStories.slice(0, end - mockStories.length)];
    };

    return (
        <div className={style.storyContainer}>
            <div className={style.titleLine}>
                <div className={style.title}>Top Stories</div>
                <div className={style.arrow}>
                    <ul>
                        <li>
                            <button onClick={handlePrev}>
                                <i className="fa fa-arrow-left"></i>
                            </button>
                        </li>
                        <li>
                            <button onClick={handleNext}>
                                <i className="fa fa-arrow-right"></i>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={`${style.storyContent} storySlider`}>
                {getVisibleStories().map((story) => (
                    <div key={story.id} className={style.storyCard}>
                        <img src={story.image} alt="featured" />
                        <div className={style.overlay}>
                            <div className={style.tags}>
                                {story.tags.map((tag, idx) => (
                                    <span key={idx} className={`${style.tag} ${style[tag.toLowerCase()]}`}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h2 className={style.title}>{story.title}</h2>
                            <div className={style.metah}>
                                <span>{story.date}</span>
                                <span>{story.author}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StoryContainer;
