import React from "react";
import style from "../styles/ColumnContainer.module.css";
import image from "../assets/background.png";
import ContinueButton from "./General/ContinueButton";
import getPreviewText from "../utils/getPreviewText";

const ColumnContainer = () => {
    const dummyText1 = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores neque, doloribus mollitia ipsum consequatur ut illum inventore sed modi tempore animi natus voluptate magni ducimus vel non iure repellat id? Quis aliquid nostrum dignissimos voluptatum. Sequi id nobis eum provident, at, consectetur debitis minus sed rerum eos beatae sunt dolor earum alias corporis, architecto ipsa nisi aliquid ratione vel nulla dicta illum. In officia molestias obcaecati velit. Fugiat temporibus commodi vel iure corporis, quaerat dolores assumenda culpa illo eligendi eum praesentium nulla blanditiis, autem error reprehenderit fuga voluptates ratione! Voluptates mollitia nulla voluptatibus, repudiandae iste debitis ipsa veritatis quasi iusto.";

    const dummyText2 = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi sed voluptates quisquam nisi inventore ipsum, repellat dolores saepe sapiente excepturi ullam fugit rem, possimus dolore molestias quis ea, cupiditate autem quaerat unde ad labore iste soluta! Culpa modi repellat rem, quis magni dolores!";

    const mockData = Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        title: `Trending Gadget #${i + 1}`,
        tags: ["Gadget", "Tech"],
        date: "📅 July 17, 2023",
        author: "👤 DemoAdmin",
        image: image,
        description: dummyText1,
    }));
    

    // const renderParagraph = (text, limit = 10) => {
    //     const getPreviewText = () => {
    //         const words = text.split(" ");
    //         if (words.length <= limit) return text;
    
    //         return words.slice(0, limit).join(" ") + " ... ";
    //     };

    //     const isLong = text.split(" ").length > 30;
    //     return (
    //         <p>
    //             {getPreviewText(text)}
    //             {isLong && <ContinueButton />}
    //         </p>
    //     );
    // };

    return (
        <div className={style.columnContainer}>
            <div className={style.titleLine}>
                <span className={style.title}>Column</span>
            </div>
            <div className={style.columnContent}>
                {mockData.map((item) => (
                    <div key={item.id} className={style.columnCard}>
                        <img src={item.image} alt="news" />
                        <div className={style.newsInfo}>
                            <span className={style.title}>{item.title}</span>
                            <div className={style.meta}>
                                <span>{item.date}</span>
                                <span>{item.author}</span>
                            </div>
                            {getPreviewText(item.description)}
                            {item.description.split(" ").length > 10 && <ContinueButton />}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ColumnContainer;
