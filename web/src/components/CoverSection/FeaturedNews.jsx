import React from "react";
import style from "./CoverSection.module.css";
// import image from "../../assets/background.png";
// import Meta from "../General/Meta";
// import NewsTag from "../General/NewsTag";
// import Overlay from "../General/Overlay";
import StorySection from "../StorySection";

const FeaturedNews = () => {
  const handlePrev = () => {
    console.log("Prev");
  };

  const handleNext = () => {
    console.log("Next");
  };

  return (
    <div className={style.coverSectionLeft}>
      <div className={style.featureCard}>
        <StorySection />
        {/* <img src={image} alt="featured" />
        <div className={style.arrow}>
          <ul>
            <li>
              <button onClick={handlePrev}>
                <i className="fa fa-chevron-left"></i>
              </button>
            </li>
            <li>
              <button onClick={handleNext}>
                <i className="fa fa-chevron-right"></i>
              </button>
            </li>
          </ul>
        </div>
        <Overlay>
          <NewsTag tags={["Tech", "Politics"]} />
          <h2 className={style.title}>Trending Gadget That Simply Change Your Lifestyle</h2>
          <Meta date="July 20, 2023" author="DemoAdmin" />
        </Overlay> */}
      </div>
    </div>
  );
};

export default FeaturedNews;
