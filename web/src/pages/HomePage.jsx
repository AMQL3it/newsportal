import React from "react";
import style from "../styles/HomePage.module.css";
import Header from "../components/Header";
import CoverSection from "../components/CoverSection";

const HomePage = () => {
    
    
    return (
        <div className={style.layout}>
            <Header />
            <CoverSection />
        </div>
    );
}

export default HomePage;