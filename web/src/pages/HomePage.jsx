import React from "react";
import style from "../styles/HomePage.module.css";
import Header from "../components/Header";
import CoverContainer from "../components/CoverContainer";
import StoryContainer from "../components/StoryContainer";
import YoutubeNewsContainer from "../components/YoutubeNewsContainer";
import GallaryContainer from "../components/GallaryContainer";
import ColumnContainer from "../components/ColumnContainer";
import Footer from "../components/Footer";

const HomePage = () => {
    
    return (
        <div className={style.layout}>
            <Header />
            <CoverContainer />
            <StoryContainer />
            <YoutubeNewsContainer />
            <ColumnContainer />
            <GallaryContainer />

            <Footer />
        </div>
    );
}

export default HomePage;