import React from "react";
import style from "../styles/HomePage.module.css";
import Header from "../components/Header";
import CoverContainer from "../components/CoverContainer";
import StoryContainer from "../components/StoryContainer";

const HomePage = () => {
    
    return (
        <div className={style.layout}>
            <Header />
            <CoverContainer />
            <StoryContainer />
        </div>
    );
}

export default HomePage;