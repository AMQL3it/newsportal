import React from "react";
import style from "../styles/CoverSection.module.css";
import BreakingNews from "./BreakingNews";
import CoverSection from "./CoverSection";

const CoverContainer = () => {
    return (
        <div className={style.coverContainer}>
            <BreakingNews />

            <CoverSection />
        </div>
    );
};

export default CoverContainer;