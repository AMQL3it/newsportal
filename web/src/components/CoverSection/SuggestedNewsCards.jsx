import React from "react";
import style from "./CoverSection.module.css";
import image from "../../assets/background.png";
import Meta from "../General/Meta";

const suggestedTitles = [
  "Art Exhibition Going To Start This Week",
  "Grand Live Concert In Germany",
  "Fighter Plane Crash During World War",
  "Fighter Plane Crash During World War"
];

const SuggestedNewsCards = () => {
  return (
    <div className={style.coverSectionBottom}>
      {suggestedTitles.map((title, i) => (
        <div key={i} className={style.bottomCard}>
          <img src={image} alt="bottom" />
          <div className={style.cardInfo}>
            <p className={style.title}>{title}</p>
            <Meta date="July 20, 2023" author="DemoAdmin" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SuggestedNewsCards;
