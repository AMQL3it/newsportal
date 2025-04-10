import React from "react";
import { NavLink } from "react-router"
import style from "../styles/Navber.module.css";

const Navber = () => {
    return (
        <div className={style.navber}>
            <ul>
                <li style={{ backgroundColor: "#127492", borderLeft: "none"}}>
                    <NavLink to="/"><i className="fa fa-home"></i></NavLink>
                </li>
                <li>
                    <NavLink to="/" >Top News</NavLink>
                </li>
                <li>
                    <NavLink to="/">Nationl</NavLink>
                </li>
                <li>
                    <NavLink to="/">International</NavLink>
                </li>
                <li>
                    <NavLink to="/">Business</NavLink>
                </li>
                <li>
                    <NavLink to="/">Sports</NavLink>
                </li>
                <li>
                    <NavLink to="/">Entertainment</NavLink>
                </li>
            </ul>

            <div className={style.searchbar}>
                <input type="text" placeholder="Search"/>
                <button>
                    <i className="fa fa-search"></i>
                </button>
            </div>
        </div> 
    )
}

export default Navber;