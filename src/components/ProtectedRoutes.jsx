import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";


const ProtectedRoutes =  ({children, role}) => {
    const {token, role:userRole} = useAuth();
    if(!token){
        return <Navigate to="/login" replace />
    }
    if(role && role!==userRole){
        return <Navigate to="login" replace />
    }
    return children
}

export default ProtectedRoutes;