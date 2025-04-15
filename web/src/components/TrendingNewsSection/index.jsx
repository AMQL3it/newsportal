import React from "react";
import style from "./TrendingNewsSection.module.css";
import TitleLine from "../General/TitleLine";
import NewsItem from "../NewsItem";
import SuggestedNewsCards from "../CoverSection/SuggestedNewsCards";
// import { Link } from "react-router-dom";

const TrendingNewsSection = () => {
    const news = {
        id: 3,
        title: "Trending Gadget That Simply Change Your Lifestyle",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, dolores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, dolores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, dolores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, dolores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, dolores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, dolores.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        date: "July 17, 2023",
        author: "DemoAdmin"
    }

    return (
        <div className={style.trendingNewsSection}>
            <TitleLine title="Trending" />
            <div className={style.newsContent}>
                <NewsItem news={news} />
                <SuggestedNewsCards styleStatus="column" />
            </div>
            
        </div>
    );
};

export default TrendingNewsSection;