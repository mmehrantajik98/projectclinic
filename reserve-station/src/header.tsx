import type React from "react";
import { useContext } from "react";
import { UserContext } from "./protectedRoute";
import "./header.css";

const Hedaer: React.FC = () => {

    const user = useContext(UserContext);

    return (
        <header className="header">

            <div className="header-logo">
                پنل مدیریت
            </div>

            <div className="header-user">
                <span className="user-name">
                    {user?.username}
                </span>

                <div className="user-avatar">
                    {user?.username?.charAt(0).toUpperCase()}
                </div>
            </div>

        </header>
    );
};

export default Hedaer;
