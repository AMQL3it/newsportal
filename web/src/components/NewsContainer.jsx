import React from "react";
import style from "../styles/NewsContainer.module.css";
import image from "../assets/background.png"
import PostSuggetionContainer from "./PostSuggetionContainer";
import Sidebar from "./Sidebar";

const NewsContainer = () => {
    return (
        <div className={style.newsContainer}>
            <div className={style.newsContent}>
                <div className={style.selectedNewsCard}>
                    <img src={image} alt="Nature"/>
                    
                    <h2 className={style.title}>Trending Gadget That Simply Change Your Lifestyle</h2>

                    <div className={style.tags}>
                        <span className={`${style.tag} ${style.green}`}>Gadget</span>
                        <span className={`${style.tag} ${style.red}`}>Tech</span>
                    </div>
                    <div className={style.meta}>
                        <span>📅 July 17, 2023</span>
                        <span>👤 DemoAdmin</span>
                    </div>
                    <div className={style.description}>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum ipsam quisquam ea consequuntur, voluptates reprehenderit qui voluptas necessitatibus laboriosam consectetur sapiente perferendis hic porro maiores ad. Consequatur, maiores autem in molestias quos officiis tempore eos vero aspernatur. Exercitationem repudiandae  voluptatum dolorum deleniti. Numquam eveniet eaque deleniti, aliquam debitis ut excepturi non, atque sequi omnis modi inventore corporis consequuntur quas vero obcaecati beatae? Exercitationem repellat accusantium tempora, consequatur vitae, earum laboriosam recusandae quia est maiores accusamus numquam ducimus ad, dolorem incidunt iste?
                        </p>
                    </div>
                    <div className={style.divider}>
                        <button className={style.slideBtn}>Previous</button>
                        <button className={style.slideBtn}>Next</button>
                    </div>

                    <PostSuggetionContainer />
                </div>
            </div>

            <Sidebar />
        </div>
    );
};

export default NewsContainer;