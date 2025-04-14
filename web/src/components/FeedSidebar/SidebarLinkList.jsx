import React from "react";
import SidebarLinkItem from "./SidebarLinkItem";
import styles from "./FeedSidebar.module.css";

const SidebarLinkList = ({ items, icon }) => (
    <div className={styles.linkList}>
        {items.map((item, index) => (
            <SidebarLinkItem key={index} title={item.title} link={item.link} icon={icon} />
        ))}
    </div>
);

export default SidebarLinkList;
