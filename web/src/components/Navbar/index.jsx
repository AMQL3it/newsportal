import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import style from "./Navbar.module.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className={style.navbar}>
            <ul>
                <li
                    style={{ backgroundColor: "#127492", borderLeft: "none" }}
                    onClick={toggleMenu}
                    className={style.homeIcon}
                >
                    <NavLink to="#"><FaHome /></NavLink>
                </li>

                <div className={`${style.menuItems} ${isOpen ? style.show : ""}`}>
                    <li><NavLink to="/">Top News</NavLink></li>
                    <li><NavLink to="/">National</NavLink></li>
                    <li><NavLink to="/">International</NavLink></li>
                    <li><NavLink to="/">Business</NavLink></li>
                    <li><NavLink to="/">Sports</NavLink></li>
                    <li><NavLink to="/">Entertainment</NavLink></li>
                </div>
            </ul>

            <div className={`${style.searchbar} ${isOpen ? style.show : ""}`}>
                <input type="text" placeholder="Search" />
                <button><i className="fa fa-search"></i></button>
            </div>
        </div>
    );
};

export default Navbar;
