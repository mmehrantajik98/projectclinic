import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "./protectedLogin";
import { UserContext } from "./protectedRoute";

const AuthUser = ({ children }: { children: React.ReactNode }): JSX.Element => {

    const ctx_auth = useContext(authContext);
    const ctx_user = useContext(UserContext)

    if (ctx_auth?.isAuth === null) {
        return <></>;
    }

    if (ctx_auth?.isAuth === false) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;

};

export default AuthUser;
