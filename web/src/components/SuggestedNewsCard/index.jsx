import React from "react";
import style from "./SuggestedNewsCard.module.css";
import image from "../../assets/background.png"
import Meta from "../General/Meta";
import TitleLine from "../General/TitleLine";

const SuggestedNewsCard = () => {
    const postInfo = [
        {
            title: "Trending Gadget That Simply Change Your Lifestyle",
            image: image,
            date: "July 17, 2023",
            author: "DemoAdmin"
        },
        {
            title: "Gadget That Simply Change Your Lifestyle",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            date: "July 17, 2023",
            author: "DemoAdmin"
        },
        {
            title: "Fashion That Simply Change Your Lifestyle",
            image: image,
            date: "July 17, 2023",
            author: "DemoAdmin"
        }
    ];

    return (
        <div className={style.suggestedNews}>
            <TitleLine title="Suggested News" />
            <div className={style.suggestedNews__list}>
                {postInfo.map((item, i) => (
                    <div className={style.suggestedNews__card} key={i}>
                        <img src={item.image} alt="Suggested" className={style.suggestedNews__image} />
                        <h2 className={style.suggestedNews__title}>{item.title}</h2>
                        <Meta date={item.date} author={item.author} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SuggestedNewsCard;
