import React from "react";
import style from "../styles/GallaryContainer.module.css";
import image from "../assets/background.png"

const GallaryContainer = () => {
    return (
        <div className={style.gallaryContainer}>
            <div className={style.titleLine}>
                <span className={style.title}>Gallery</span>
            </div>
            <div className={style.gallaryContent}>
                {[
                    { tag: "Music", color: "orange", title: "Grand Live Concert In Germany" },
                    { tag: "Fashion", color: "pink", title: "New Trending Wedding Fashion" },
                    { tag: "Lifestyle", color: "yellow", title: "Best New Phone For New Lifestyle" },
                    { tag: "Travel", color: "blue", title: "Most Important Thing That Need To Carry" },
                    { tag: "Lifestyle", color: "yellow", title: "Best New Phone For New Lifestyle" },
                    { tag: "Travel", color: "blue", title: "Most Important Thing That Need To Carry" },
                ].map((item, i) => (
                    <div key={i} className={style.imageCard}>
                        <img src={image} alt="news" />
                        <div className={style.overlay}>
                            <span className={`${style.tag} ${style[item.color]}`}>{item.tag}</span>
                            <p className={style.title}>{item.title}</p>
                            <div className={style.metah}>
                                <span>📅 July 20, 2023</span>
                                <span>👤 DemoAdmin</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GallaryContainer;