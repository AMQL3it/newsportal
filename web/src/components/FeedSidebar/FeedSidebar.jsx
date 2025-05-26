import { useEffect, useState } from "react";
import { FaFolder } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import categoryService from "../../services/categoryService";
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
    <aside className="w-full p-4 bg-gray-200 dark:bg-gray-900 rounded-md shadow-md">
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

      <SidebarSection title="Archives" className="mt-6">
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

      <SidebarSection title="Categories" className="mt-6">
        <div className="flex flex-col gap-3 mt-2">
          {categories.map((item) => (
            <div
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              className="flex items-center gap-2 text-sm font-medium text-[#127492] hover:text-green-500 dark:text-[#127492] dark:hover:text-green-300 cursor-pointer select-none transition-colors duration-200"
              title={item.response}
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
