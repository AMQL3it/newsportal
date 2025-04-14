import React from "react";
import TitleLine from "../General/TitleLine";
import styles from "./FeedSidebar.module.css";

const SidebarSection = ({ title, children }) => (
    <section className={styles.sidebarSection}>
        <TitleLine title={title} />
        {children}
    </section>
);

export default SidebarSection;
