import axios from "axios";
import type React from "react";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface children{
    children: React.ReactNode;
    allowedroles: string[];
}

interface UserRole{
    username: string,
    role: string,
}

export const UserContext = createContext<UserRole | null>(null);

const ProtectedRoute: React.FC<children>= ({children, allowedroles}) => {

    const [users, setUsers] = useState<UserRole | null>(null)

    const navigate = useNavigate()

    const getRoles = async ()=>{
        try{
            const res = await axios.get("https://hedro.ir/api/getUsers",
                {
                    withCredentials:true,
                }
            )
            setUsers({
                ...users,
                username: res.data.username,
                role: res.data.role,
            })
        }catch(e){
            console.log(e)
        }
    }

     useEffect(() => {
        getRoles();
    }, []);

    if (!users){
        return
    }

    if (users.role === "CEO" || users.role === "marketing") {
        return <>{children}</>;
    }

    if (!allowedroles.includes(users.role)){
        navigate("/", {replace:true})
        return <h1>شما دسترسی به صفحه مورد نظر را ندارید!</h1>
    }

    return ( 
        <UserContext.Provider value={users}>
            {children}
        </UserContext.Provider>
    );

}
 
export default ProtectedRoute;