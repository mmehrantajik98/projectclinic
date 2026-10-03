import type React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./protectedRoute";
import "./aside.css";
import { authContext } from "./protectedLogin";

const Aside: React.FC = () => {

    const user = useContext(UserContext);
    const auth = useContext(authContext);

    const handleLogout = async () => {

        if (auth) {
            await auth.logOut();
        }

    };

    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">

                {(user?.role === "CEO" ||
                    user?.role === "marketing" ||
                    user?.role === "reception") && (
                    <>
                        <Link to="/">مراجعین</Link>
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

                {(user?.role === "CEO" ||
                    user?.role === "marketing" ||
                    user?.role === "callcenter") && (
                    
                        <Link to="/reception">پذیرش</Link>
                    
                )}

                <button onClick={handleLogout}>
                    خروج
                </button>

            </nav>
        </aside>
    );
};

export default Aside;
