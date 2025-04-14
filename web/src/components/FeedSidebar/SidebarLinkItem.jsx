import React from "react";
import { NavLink } from "react-router-dom";
import { FaAngleDoubleRight, FaArchive, FaFolder } from "react-icons/fa";
import styles from "./FeedSidebar.module.css";

const icons = {
    "double-right": <FaAngleDoubleRight />,
    archive: <FaArchive />,
    folder: <FaFolder />,
};

const SidebarLinkItem = ({ title, link, icon }) => (
    <div className={styles.linkItem}>
        {icons[icon]}
        <NavLink to={link}>{title}</NavLink>
    </div>
);

export default SidebarLinkItem;
