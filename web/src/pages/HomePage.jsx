import React from "react";
import style from "../styles/HomePage.module.css";
import logo from "../assets/logo.png";
import { useEffect } from "react";
import { useBanglaDate } from "../hooks/useBanglaDate";
import { useHijriDate } from "../hooks/useHijriDate";

const HomePage = () => {
    const today = new Date().toISOString().split('T')[0]; // e.g., "2025-04-09"
    const [banglaDate, convertBanglaDate] = useBanglaDate(today);
    const [hijriDate, convertIslamicDate] = useHijriDate(today);

    useEffect(() => {
        
        convertBanglaDate();
        convertIslamicDate();

    }, [convertBanglaDate, convertIslamicDate]);
    
    return (
        <div className={style.layout}>
            <div className={style.header}>
                <div className={style.headertop}>
                    <div className={style.date}>
                        <i className="fa fa-calendar"></i>
                        <span>{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "2-digit",  })}</span>
                        <span>|</span>
                        <span>{banglaDate}</span>
                        <span>|</span>
                        <span>{hijriDate}</span>
                    </div>
                    
                    <div className={style.addiconsection}>
                        <ul>
                            <li><a href="http://" target="_blank" rel="noopener noreferrer"><i><i className="fa fa-facebook"></i></i> </a></li>
                            <li><a href="http://" target="_blank" rel="noopener noreferrer"><i><i className="fa fa-whatsapp"></i></i> </a></li>
                            <li><a href="http://" target="_blank" rel="noopener noreferrer"><i><i className="fa fa-linkedin"></i></i> </a></li>
                            <li><a href="http://" target="_blank" rel="noopener noreferrer"><i><i className="fa fa-twitter"></i></i> </a></li>

                        </ul>
                    </div>
                </div>
                <div className={style.headerbody}>
                    <div className={style.logo}>
                        <img src={logo} alt="logo" />
                        <h1>News <span>Portal</span></h1>
                    </div>
                    <div><input type="text" /></div>
                </div>
                <div className={style.navber}>C</div>
            </div>
            
        </div>
    );
}

export default HomePage;