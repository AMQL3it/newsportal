import styles from "./FeedSidebar.module.css";
import SidebarLinkItem from "./SidebarLinkItem";

const SidebarLinkList = ({ items, icon }) => (
  <div className={styles.linkList}>
    {items.map((item, index) => (
      <SidebarLinkItem
        key={index}
        title={item.name}
        link={item.link}
        icon={icon}
      />
    ))}
  </div>
);

export default SidebarLinkList;
