import React from "react";
import style from "./CoverSection.module.css";
import FeaturedNews from "./FeaturedNews";
import GridNewsCards from "./GridNewsCards";
import SuggestedNewsCards from "./SuggestedNewsCards";

const CoverSection = () => {
  return (
    <div className={style.coverSection}>
      <FeaturedNews />
      <GridNewsCards />
      <SuggestedNewsCards />
    </div>
  );
};

export default CoverSection;
