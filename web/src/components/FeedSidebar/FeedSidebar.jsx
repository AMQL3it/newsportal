import React from "react";
import styles from "./FeedSidebar.module.css";
import SidebarSection from "./SidebarSection";
import SidebarLinkList from "./SidebarLinkList";

const FeedSidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <SidebarSection title="Recent Posts">
                <SidebarLinkList
                    items={[
                        { title: "Trending Gadget That Simply Change Your Lifestyle", link: "" },
                        { title: "Gadget That Simply Change Your Lifestyle", link: "" },
                        { title: "Fashion That Simply Change Your Lifestyle", link: "" },
                    ]}
                    icon="double-right"
                />
            </SidebarSection>

            <SidebarSection title="Archives">
                <SidebarLinkList
                    items={[
                        { title: "July 2023", link: "" },
                        { title: "June 2023", link: "" },
                        { title: "May 2023", link: "" },
                        { title: "April 2023", link: "" },
                    ]}
                    icon="archive"
                />
            </SidebarSection>

            <SidebarSection title="Categories">
                <SidebarLinkList
                    items={[
                        { title: "Gadget", link: "" },
                        { title: "Fashion", link: "" },
                        { title: "Lifestyle", link: "" },
                    ]}
                    icon="folder"
                />
            </SidebarSection>
        </aside>
    );
};

export default FeedSidebar;
