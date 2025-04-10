import React from "react";
import style from "../styles/StoryContainer.module.css";
// import image from "../assets/cover.png"

const StoryContainer = () => {
    const handlePrev = () => {
        console.log("Prev");
    }

    const handleNext = () => {
        console.log("Next");
    }
    return (
        <div className={style.storyContainer}>
            <div className={style.titleLine}>
                <div className={style.title}>Top Stories</div>
                <div className={style.arrow}>
                    <ul>
                        <li>
                            <button onClick={handlePrev}>
                                <i className="fa fa-arrow-left"></i>
                            </button>   
                        </li>
                        <li>
                            <button onClick={handleNext}>
                                <i className="fa fa-arrow-right"></i>
                            </button>
                        </li>    
                    </ul>
                </div>
            </div>
            <div className={style.story}>
                
            </div>
        </div>
    );
};

export default StoryContainer;
            
