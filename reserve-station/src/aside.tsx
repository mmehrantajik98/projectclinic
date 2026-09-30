import type React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./protectedRoute";
import "./aside.css";

interface Props {}

const Aside: React.FC<Props> = () => {

    const user = useContext(UserContext);
    console.log("USER:", user);
    console.log("ROLE:", user?.role);

    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">

                {(user?.role === "CEO" ||
                    user?.role === "marketing" ||
                    user?.role === "reception") && (
                    <>
                        <Link to="/">ثبت اطلاعات</Link>
                        <Link to="/peoples">جدول پذیرش</Link>
                    </>
                )}

                {(user?.role === "CEO" ||
                    user?.role === "marketing" ||
                    user?.role === "photographer") && (
                    <Link to="/photographer">عکاس</Link>
                )}

                {(user?.role === "CEO" ||
                    user?.role === "marketing" ||
                    user?.role === "doctor") && (
                    <Link to="/consent">مشاوره</Link>
                )}

                {(user?.role === "CEO" ||
                    user?.role === "marketing" ||
                    user?.role === "callcenter") && (
                    <>
                        <Link to="/callcenter">کال سنتر</Link>
                        <Link to="/callcentertable">جدول کال سنتر</Link>
                    </>
                )}

                <button>خروج</button>

            </nav>
        </aside>
    );
};

export default Aside;