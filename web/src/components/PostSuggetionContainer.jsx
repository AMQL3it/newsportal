import React from "react";
import style from "../styles/PostSuggetionContainer.module.css";
import image from "../assets/background.png"

const PostSuggetionContainer = () => {
    return (
        <div className={style.postSuggetionContainer}>
            <div className={style.titleLine}>
                <span className={style.title}>Post Suggetion</span>
            </div>
            <div className={style.postSuggetionContent}>
                <div className={style.postSuggetionCard}>
                    <img src={image} alt="Nature"/>
                    <h2 className={style.title}>Trending Gadget That Simply Change Your Lifestyle</h2>
                    <div className={style.meta}>
                        <span>📅 July 17, 2023</span>
                        <span>👤 DemoAdmin</span>
                    </div>
                </div>
                <div className={style.postSuggetionCard}>
                    <img src={image} alt="Nature"/>
                    <h2 className={style.title}>Trending Gadget That Simply Change Your Lifestyle</h2>
                    <div className={style.meta}>
                        <span>📅 July 17, 2023</span>
                        <span>👤 DemoAdmin</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostSuggetionContainer;