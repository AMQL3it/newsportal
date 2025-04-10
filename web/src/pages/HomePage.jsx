import React from "react";
import style from "../styles/HomePage.module.css";
import Header from "../components/Header";
import CoverContainer from "../components/CoverContainer";

const HomePage = () => {
    
    return (
        <div className={style.layout}>
            <Header />
            <CoverContainer />
        </div>
    );
}

export default HomePage;