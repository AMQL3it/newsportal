import React from "react";
import style from "./CoverSection.module.css";
import image from "../../assets/background.png";
import Meta from "../General/Meta";
import Overlay from "../General/Overlay";
import NewsTag from "../General/NewsTag";

const newsData = [
  { tag: "Music", color: "orange", title: "Grand Live Concert In Germany" },
  { tag: "Fashion", color: "pink", title: "New Trending Wedding Fashion" },
  { tag: "Lifestyle", color: "yellow", title: "Best New Phone For New Lifestyle" },
  { tag: "Travel", color: "blue", title: "Most Important Thing That Need To Carry" },
];

const GridNewsCards = () => {
  return (
    <div className={style.coverSectionRight}>
      {newsData.map((item, i) => (
        <div key={i} className={style.gridCard}>
            <img src={image} alt="news" />
            <Overlay>
                <NewsTag tags={[item.tag]} />
                <span>{item.title}</span>
                <Meta date="July 20, 2023" author="DemoAdmin" />
            </Overlay>
        </div>
      ))}
    </div>
  );
};

export default GridNewsCards;
