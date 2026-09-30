import React from "react";
import Aside from "./aside";
import "./layout.css";
import Hedaer from "./header";

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <div className="layout">

            <Hedaer />
            <Aside />
            <main className="layout-content">
                {children}
            </main>
            
        </div>
    );
};

export default Layout;

