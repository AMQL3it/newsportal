import React from "react";
import style from "./NewsItem.module.css";
import ContinueButton from "../General/ContinueButton";
import getPreviewText from "../../utils/getPreviewText";
import Meta from "../General/Meta";
import NewsTag from "../General/NewsTag";

const NewsItem = ({ news, status }) => {
    
    return (
        <div className={style.newsItem}>
            <img src={news.image} alt={news.title} />
            <h3>{news.title}</h3>
            <NewsTag tags={['Tech', 'Politics', 'Food']} />
            <Meta date={news.date} author={news.author} />
            <p>{status === "singleNews" ? news.content : getPreviewText(news.content, 20)}</p>

            {(status !== "singleNews" && news.content.split(" ").length > 30) && <ContinueButton />}

        </div>
    );
};

export default NewsItem;