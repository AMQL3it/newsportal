import React from "react";
import style from "./GallarySection.module.css";
import image from "../../assets/background.png"
import Meta from "../General/Meta";
import NewsTag from "../General/NewsTag";
import Overlay from "../General/Overlay";
import TitleLine from "../General/TitleLine";

const GallarySection = () => {
    return (
        <div className={style.gallaryContainer}>
            <TitleLine title="Gallary" />
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
                        <Overlay>
                            <NewsTag tags={[item.tag]} />
                            <span>{item.title}</span>
                            <Meta date="July 20, 2023" author="DemoAdmin" />
                        </Overlay>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GallarySection;