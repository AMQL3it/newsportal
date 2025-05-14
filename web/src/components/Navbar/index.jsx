import { useEffect, useState } from "react";
import { FaBars, FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import categoryService from "../../services/categoryService";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await categoryService.getAll();
      setCategories(res.data || []);
    } catch (error) {
      console.error("Failed to load categories", error);
    }
  };

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="bg-green-500 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap">
        {/* Left - Logo/Home */}
        <div className="flex items-center gap-2">
          <NavLink to="/" className="text-xl font-bold flex items-center gap-2">
            <FaHome />
            <span className="hidden sm:inline">Home</span>
          </NavLink>
        </div>

        {/* Mobile menu button */}
        <div className="block md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <FaBars size={20} />
          </button>
        </div>

        {/* Menu items */}
        <div
          className={`w-full md:flex md:items-center md:w-auto ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <ul className="md:flex md:space-x-4 flex flex-col md:flex-row mt-3 md:mt-0">
            {categories.map((cat) => (
              <li key={cat.id}>
                <NavLink
                  to={`/newsfeed/${cat.id}`}
                  className="block px-4 py-2 text-sm font-medium hover:bg-green-600 hover:text-white rounded transition duration-1000"
                >
                  {cat.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Search bar */}
          <div className="mt-3 md:mt-0 md:ml-4 flex items-center w-full md:w-auto">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-1 rounded-l bg-white text-gray-800 w-full md:w-64 focus:outline-none"
            />
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-r transition duration-1000">
              Search
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
