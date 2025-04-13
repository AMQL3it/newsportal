import { FaRegCalendarCheck } from "react-icons/fa";
import style from "./Header.module.css";
import Navbar from "../Navbar";
import logo from "../../assets/logo.png";
import { useEffect } from "react";
import { useBanglaDate } from "../../hooks/useBanglaDate";
import { useHijriDate } from "../../hooks/useHijriDate";

const Header = () => {
    const today = new Date();
    const day = today.toLocaleDateString("en-US", { weekday: "long" });
    const date = today.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
    
    const todayFormatted = today.toISOString().split('T')[0]; // e.g., "2025-04-09";
    const [banglaDate, convertBanglaDate] = useBanglaDate(todayFormatted);
    const [hijriDate, convertIslamicDate] = useHijriDate(todayFormatted);


    useEffect(() => {
        
        convertBanglaDate();
        convertIslamicDate();

    }, [convertBanglaDate, convertIslamicDate]);
    
    return (
        <div className={style.header}>
            <div className={style.headerbody}>
                <div className={style.logo}>
                    <img src={logo} alt="logo" />
                    <h1>News <span>Portal</span></h1>
                </div>
                <div className={style.dateSection}>
                    <div className={style.icon}>
                        <FaRegCalendarCheck />
                    </div>
                    <div className={style.dateContent}>
                        <div className={style.day}>
                            {day}
                        </div>
                        <div className={style.date}>
                            <span>{date}</span>
                            <span>{banglaDate}</span>
                        
                            {/* <span>{hijriDate}</span> */}
                        </div>
                    </div>
                    
                </div>
            </div>
            <Navbar />
        </div>
    );
};

export default Header;