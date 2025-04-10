import React from "react";
import style from "../styles/CoverSection.module.css";
import BreakingNews from "./BreakingNews";

const CoverSection = () => {
    return (
        <div className={style.coversection}>
            <BreakingNews />
        </div>
    );
};

export default CoverSection;