import React from "react";
import style from "../styles/CoverSection.module.css";
import image from "../assets/background.png"
import logo from "../assets/logo.png"

const CoverSection = () => {
  const handlePrev = () => {
    console.log("Prev");
  }

  const handleNext = () => {
    console.log("Next");
  }

  return (
    <div className={style.coverSection}>
      {/* Left Large Featured */}
      <div className={style.coverSectionLeft}>
        <div className={style.featureCard}>
          <img src={image} alt="featured" />
          <div className={style.arrow}>
            <ul>
                <li>
                    <button onClick={handlePrev}>
                        <i className="fa fa-chevron-left"></i>
                    </button>   
                </li>
                <li>
                    <button onClick={handleNext}>
                        <i className="fa fa-chevron-right"></i>
                    </button>
                </li>    
            </ul>
          </div>
          <div className={style.overlay}>
            {/* <div className={style.arrow}>
              <ul>
                  <li>
                      <button onClick={handlePrev}>
                          <i className="fa fa-chevron-left"></i>
                      </button>   
                  </li>
                  <li>
                      <button onClick={handleNext}>
                          <i className="fa fa-chevron-right"></i>
                      </button>
                  </li>    
              </ul>
            </div> */}
            <div className={style.tags}>
              <span className={`${style.tag} ${style.green}`}>Gadget</span>
              <span className={`${style.tag} ${style.red}`}>Tech</span>
            </div>
            <h2 className={style.title}>Trending Gadget That Simply Change Your Lifestyle</h2>
            <div className={style.metah}>
              <span>📅 July 17, 2023</span>
              <span>👤 DemoAdmin</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Grid */}
      <div className={style.coverSectionRight}>
        {[
          { tag: "Music", color: "orange", title: "Grand Live Concert In Germany" },
          { tag: "Fashion", color: "pink", title: "New Trending Wedding Fashion" },
          { tag: "Lifestyle", color: "yellow", title: "Best New Phone For New Lifestyle" },
          { tag: "Travel", color: "blue", title: "Most Important Thing That Need To Carry" },
        ].map((item, i) => (
          <div key={i} className={style.gridCard}>
            <img src={image} alt="news" />
            <div className={style.overlay}>
              <span className={`${style.tag} ${style[item.color]}`}>{item.tag}</span>
              <p className={style.title}>{item.title}</p>
              <div className={style.metah}>
                <span>📅 July 20, 2023</span>
                <span>👤 DemoAdmin</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Row */}
      <div className={style.coverSectionBottom}>
        {[
          "Art Exhibition Going To Start This Week",
          "Grand Live Concert In Germany",
          "Fighter Plane Crash During World War",
          "Fighter Plane Crash During World War"
        ].map((title, i) => (
          <div key={i} className={style.bottomCard}>
            <img src={image} alt="bottom" />
            <div className={style.cardInfo}>
                <p className={style.title}>{title}</p>
                <div className={style.meta}>
                    <span>📅 July 24, 2023</span>
                    <span>👤 DemoAdmin</span>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoverSection;
