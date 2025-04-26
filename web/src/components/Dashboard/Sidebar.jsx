import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

const Sidebar = () => {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: "tachometer", to: "" },
    { name: "Posts", icon: "building", to: "posts" },
    { name: "Category", icon: "map", to: "categories" },
    { name: "Tags", icon: "building", to: "tags" },
    { name: "Advertisement", icon: "users", to: "advertisements" },
    { name: "Comments", icon: "map", to: "comments" },
    { name: "Users", icon: "shopping-cart", to: "users" },
    { name: "Analytics & Reports", icon: "truck", to: "analytics" },
  
    { name: "Settings", icon: "cog", bottom: true },
    { name: "Profile", icon: "user", bottom: true },
  ];

  return (
    <div style={styles.sidebar}>
      {/* Logo and Company Name */}
      <div style={styles.logoContainer}>
        <div style={styles.logo}>
          <img src={logo} alt="Logo" style={styles.logo} />
        </div>
        <h2 style={styles.companyName}>AMQL3it</h2>
      </div>
      
      {/* Menu Items */}
      <div style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          !item.bottom && (
            <button
              key={index}
              style={{
                ...styles.menuButton,
                ...(active === item.name ? styles.activeButton : styles.hoverButton),
              }}
              onClick={() => setActive(item.name)}
            >
              <NavLink to={item.to} style={{ textDecoration: "none", color: "white" }}>
                <i className={`fa fa-${item.icon}`} style={{ marginRight: "8px" }}></i>
                {item.name}
              </NavLink>
            </button>
          )
        ))}
      </div>
      
      {/* Bottom Menu Items */}
      <div style={styles.bottomMenu}>
        {menuItems.map((item, index) => (
          item.bottom && (
            <button
              key={index}
              style={{
                ...styles.menuButton,
                ...(active === item.name ? styles.activeButton : styles.hoverButton),
              }}
              onClick={() => setActive(item.name)}
            >
              <i className={`fa fa-${item.icon}`}></i>
              {item.name}
            </button>
          )
        ))}
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "200px",
    height: "calc(100vh - 40px)",
    backgroundColor: "rgba(35, 35, 35, 0.5)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  logo: {
    width: "50px",
    height: "50px",
    backgroundColor: "gray",
    borderRadius: "50%",
  },
  companyName: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "white",
  },
  menuContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    flex: 1,
  },
  menuButton: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    background: "none",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  activeButton: {
    backgroundColor: "#4caf50",
    fontWeight: "bold",
  },
  hoverButton: {
    backgroundColor: "rgba(137, 137, 137, 0.3)",
    color: "white",
  },
  bottomMenu: {
    borderTop: "1px solid #ccc",
    paddingTop: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
};

export default Sidebar;
