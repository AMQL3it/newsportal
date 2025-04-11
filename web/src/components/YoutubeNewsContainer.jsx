import React from "react";
import style from "../styles/YoutubeNewsContainer.module.css";
import image from "../assets/background.png"
// import { Link } from "react-router-dom";

const YoutubeNewsContainer = () => {
    return (
        <div className={style.youtubeNewsContainer}>
            <div className={style.titleLine}>
                <span className={style.title}>Travelling</span>
            </div>
            <div className={style.newsContent}>
                <div className={style.selectedNewsCard}>
                    <img src={image} alt="Nature"/>
                    {/* <div className={style.tags}>
                        <span className={`${style.tag} ${style.green}`}>Gadget</span>
                        <span className={`${style.tag} ${style.red}`}>Tech</span>
                    </div> */}
                    <h2 className={style.title}>Trending Gadget That Simply Change Your Lifestyle</h2>
                    <div className={style.meta}>
                        <span>📅 July 17, 2023</span>
                        <span>👤 DemoAdmin</span>
                    </div>
                    <div className={style.description}>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum ipsam quisquam ea consequuntur, voluptates reprehenderit qui voluptas necessitatibus laboriosam consectetur sapiente perferendis hic porro maiores ad. Consequatur, maiores autem in molestias quos officiis tempore eos vero aspernatur. Exercitationem repudiandae  voluptatum dolorum deleniti. Numquam eveniet eaque deleniti, aliquam debitis ut excepturi non, atque sequi omnis modi inventore corporis consequuntur quas vero obcaecati beatae? Exercitationem repellat accusantium tempora, consequatur vitae, earum laboriosam recusandae quia est maiores accusamus numquam ducimus ad, dolorem incidunt iste?
                        </p>
                    </div>
                </div>
                <div className={style.suggestedSection}>
                    {[
                        "Art Exhibition Going To Start This Week",
                        "Grand Live Concert In Germany Next",
                        "Fighter Plane Crash During World War hdj jdglk",
                        "Fighter Plane Crash During World War",
                        "Fighter Plane Crash During World War",
                    ].map((title, i) => (
                        <div key={i} className={style.bottomCard}>
                        <img src={image} alt="bottom" />
                        <div className={style.cardInfo}>
                            <p className={style.smalltitle}>{title}</p>
                            <div className={style.meta}>
                                <span>📅 July 24, 2023</span>
                                <span>👤 DemoAdmin</span>
                            </div>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default YoutubeNewsContainer;