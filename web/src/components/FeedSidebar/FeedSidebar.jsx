import { useEffect, useState } from "react";
import categoryService from "../../services/categoryService";
import styles from "./FeedSidebar.module.css";
import SidebarLinkList from "./SidebarLinkList";
import SidebarSection from "./SidebarSection";

const FeedSidebar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await categoryService.getAll();
        const data = result.data.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          link: "#",
          response: c.is_active ? "Enable" : "Disable",
        }));
        console.log(data);

        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <aside className={styles.sidebar}>
      <SidebarSection title="Recent Posts">
        <SidebarLinkList
          items={[
            {
              name: "Trending Gadget That Simply Change Your Lifestyle",
              link: "",
            },
            { name: "Gadget That Simply Change Your Lifestyle", link: "" },
            { name: "Fashion That Simply Change Your Lifestyle", link: "" },
          ]}
          icon="double-right"
        />
      </SidebarSection>

      <SidebarSection title="Archives">
        <SidebarLinkList
          items={[
            { name: "July 2023", link: "" },
            { name: "June 2023", link: "" },
            { name: "May 2023", link: "" },
            { name: "April 2023", link: "" },
          ]}
          icon="archive"
        />
      </SidebarSection>

      <SidebarSection title="Categories">
        <SidebarLinkList items={categories} icon="folder" />
      </SidebarSection>
    </aside>
  );
};

export default FeedSidebar;
