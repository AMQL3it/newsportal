import React, { useState } from "react";
import style from "./NewsItem.module.css";
import ContinueButton from "../General/ContinueButton";
import getPreviewText from "../../utils/getPreviewText";
import Meta from "../General/Meta";
import NewsTag from "../General/NewsTag";
import { FaEye, FaHeart, FaComment } from "react-icons/fa";
import WriteComment from "../Comment/WriteComment";

const NewsItem = ({ news, status }) => {
    const [views, setViews] = useState(news.stats?.views || 0);
    const [likes, setLikes] = useState(news.stats?.likes || 0);
    const [comments, setComments] = useState(news.comments || []);

    const handleLike = () => {
        setLikes(likes + 1);
        // Backend call here (e.g., axios.post(`/api/posts/${news.id}/like`))
    };

    const handleView = () => {
        setViews(views + 1);
        // Backend call here (e.g., axios.post(`/api/posts/${news.id}/view`))
    };

    const handleNewComment = (comment) => {
        setComments([comment, ...comments]);
        // Backend call to store comment (e.g., axios.post(`/api/posts/${news.id}/comment`, { text }))
    };

    return (
        <div className={style.newsItem}>
            <img src={`http://localhost:5000/${news.image}`} alt={news.title} onClick={handleView} />
            <h3>{news.title}</h3>
            <NewsTag tags={news.tags.map(t => t.name)} />

            <div className={style.authorSection}>
                <Meta
                    date={new Date(news.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                    })}
                    author={news.author}
                />

                <div className={style.views}>
                    <span className={style.statItem} onClick={handleView}>
                        <FaEye className={style.icon} /> {views}
                    </span>
                    <span className={style.statItem} onClick={handleLike}>
                        <FaHeart className={style.icon} /> {likes}
                    </span>
                    <span className={style.statItem}>
                        <FaComment className={style.icon} /> {comments.length}
                    </span>
                </div>
            </div>

            <p>{status === "singleNews" ? news.content : getPreviewText(news.content, 20)}</p>
            {(status !== "singleNews" && news.content.split(" ").length > 30) && <ContinueButton />}

            {status === "singleNews" && (
                <>
                    <WriteComment onSubmit={handleNewComment} />
                    <ul className={style.commentList}>
                        {comments.map((c, i) => (
                            <li key={i}>{c.text}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default NewsItem;
