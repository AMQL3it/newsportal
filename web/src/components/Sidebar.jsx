import React from "react";
import style from "../styles/Sidebar.module.css";
import { NavLink } from "react-router";
import { FaAngleDoubleRight, FaArchive, FaFolder } from "react-icons/fa";

const Sidebar = () => {

    const suggestionList = [
        {
            title: "Trending Gadget That Simply Change Your Lifestyle",
            link: ""
        },
        {
            title: "Gadget That Simply Change Your Lifestyle",
            link: ""
        },
        {
            title: "Fashion That Simply Change Your Lifestyle",
            link: ""
        }
    ];

    const archiveList = [
        {
            title: "July 2023",
            link: ""
        },
        {
            title: "June 2023",
            link: ""
        },
        {
            title: "May 2023",
            link: ""
        },
        {
            title: "April 2023",
            link: ""
        }
    ]

    const categoryList = [
        {
            title: "Gadget",
            link: ""
        },
        {
            title: "Fashion",
            link: ""
        },
        {
            title: "Lifestyle",
            link: ""
        }
    ]

    return (
        <div className={style.sidebarContainer}>
            <div className={style.recenstpostSection}>
                <div className={style.titleLine}>
                    <span className={style.title}>Recents</span>
                </div>

                <div className={style.suggestionList}>
                    {suggestionList.map((item, i) => (
                        <span key={i} className={style.suggestion}>
                            <FaAngleDoubleRight />
                            <NavLink to={item.link}>{item.title}</NavLink>
                        </span>
                    ))}
                   
                </div>

            </div>

            <div className={style.archiveSection}>
                <div className={style.titleLine}>
                    <span className={style.title}>Archive</span>
                </div>

                <div className={style.archiveList}>
                    {archiveList.map((item, i) => (
                        <span key={i} className={style.archive}>
                            <FaArchive />
                            <NavLink to={item.link}>{item.title}</NavLink>
                        </span>
                    ))}

                </div>
            </div>

            <div className={style.categorySection}>
                <div className={style.titleLine}>
                    <span className={style.title}>Category</span>
                </div>

                <div className={style.categoryList}>
                    {categoryList.map((item, i) => (
                        <span key={i} className={style.category}>
                            <FaFolder />
                            <NavLink to={item.link}>{item.title}</NavLink>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;