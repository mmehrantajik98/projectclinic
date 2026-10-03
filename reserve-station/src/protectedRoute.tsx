import axios from "axios";
import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./protectedLogin";
import { Navigate } from "react-router-dom";

interface children {
    children: React.ReactNode;
    allowedroles: string[];
}

interface UserRole {
    username: string;
    role: string;
}

export const UserContext = createContext<UserRole | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [users, setUsers] = useState<UserRole | null>(null);

    const auth = useContext(authContext);

    useEffect(() => {

        if (auth?.isAuth !== true) {
            return;
        }

        const getRoles = async () => {

            try {

                const res = await axios.get(
                    "https://hedro.ir/api/getUsers",
                    {
                        withCredentials: true,
                    }
                );

                setUsers({
                    username: res.data.username,
                    role: res.data.role,
                });

            } catch (e) {

                console.log(e);

            }

        };

        getRoles();

    }, [auth?.isAuth]);

    return (
        <UserContext.Provider value={users}>
            {children}
        </UserContext.Provider>
    );
};

const ProtectedRoute: React.FC<children> = ({ children, allowedroles }) => {

    const user = useContext(UserContext);


    if (!user) {
        return null;
    }

    if (user.role === "CEO" || user.role === "marketing") {
        return <>{children}</>;
    }

    if (!allowedroles.includes(user.role)) {
        return <h1>شما اجازه ورود ندارید</h1>
    }

    return <>{children}</>;
};

export default ProtectedRoute;