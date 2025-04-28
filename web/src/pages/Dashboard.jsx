import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";
import background from "../assets/background.png";

const Dashboard = () => {
  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.body}>
        {/* <div style={styles.header}>Header Section</div> */}
        <div style={styles.content}>
          {/* Your content goes here */}
          <Outlet />
          {/* Add more content to see the scroll effect */}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  body: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    // marginLeft: "200px", // Assuming sidebar width is 200px
  },
  header: {
    height: "60px", // Fixed header height
    background: "linear-gradient(to bottom,rgb(249, 252, 254),rgb(171, 171, 171))",
    // color: "#fff",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    overflowY: "auto", // Makes the content area scrollable
    padding: "20px",
  },
};

export default Dashboard;
