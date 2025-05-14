import { useEffect, useState } from "react";
import { FaFolder } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import categoryService from "../../services/categoryService";
import styles from "./FeedSidebar.module.css";
import SidebarLinkList from "./SidebarLinkList";
import SidebarSection from "./SidebarSection";

const FeedSidebar = () => {
  const navigate = useNavigate();
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

  const handleLinkClick = (id) => {
    navigate("./" + id);
  };

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
        <div className="flex flex-col gap-2 mt-2">
          {categories.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-500 cursor-pointer"
              onClick={() => handleLinkClick(item.id)}
            >
              <FaFolder />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </SidebarSection>
    </aside>
  );
};

export default FeedSidebar;
