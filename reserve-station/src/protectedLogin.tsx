import axios from "axios";
import type React from "react";
import { useState, useEffect, createContext } from "react";

interface Children {
    children: React.ReactNode;
}

interface CurrentUser {
    username: string;
    username_id: number;
}

interface ContextContent {
    isAuth: boolean | null;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean | null>>;
    logOut: () => void;
    currentUser: CurrentUser;
    setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser>>;
}

export const authContext = createContext<ContextContent | null>(null);

const ProtectedLogin: React.FC<Children> = ({ children }) => {

    const [isAuth, setIsAuth] = useState<boolean | null>(null);

    const [currentUser, setCurrentUser] = useState<CurrentUser>({
        username: "",
        username_id: 0
    });

    useEffect(() => {

        const check_Auth = async () => {

            try {

                const auth = await axios.get(
                    "https://hedro.ir/api/check_Auth/",
                    {
                        withCredentials: true,
                    }
                );

                setCurrentUser({
                    username: auth.data.username,
                    username_id: auth.data.username_id,
                });

                setIsAuth(auth.data.authenticate === true);

            } catch (e) {

                console.log(e);
                setIsAuth(false);

            }

        };

        check_Auth();

    }, []);

    const logOut = async () => {

        try {

            await axios.post(
                "https://hedro.ir/api/Logout/",
                {},
                {
                    withCredentials: true,
                }
            );

            setIsAuth(false);

            setCurrentUser({
                username: "",
                username_id: 0
            });

        } catch (e) {

            console.log("cant logout");

        }

    };

    return (
        <authContext.Provider
            value={{
                isAuth,
                setIsAuth,
                logOut,
                currentUser,
                setCurrentUser
            }}
        >
            {children}
        </authContext.Provider>
    );
};

export default ProtectedLogin;
