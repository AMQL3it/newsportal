import React from "react";
import style from "../styles/HomePage.module.css";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const Layout = () => {
    
    return (
        <div className={style.layout}>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default Layout;