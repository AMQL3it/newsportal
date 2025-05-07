import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import style from "../styles/Layout.module.css";

const Layout = () => {
  return (
    <div className={style.layout}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
