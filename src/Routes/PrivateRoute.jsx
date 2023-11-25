import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";


const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div className="py-20">
            <div className="flex flex-col rounded shadow-md w-60 m-auto sm:w-80 animate-pulse h-96">
                <div className="h-48 rounded-t dark:bg-gray-700"></div>
                <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-900">
                    <div className="w-full h-6 rounded dark:bg-gray-700"></div>
                    <div className="w-full h-6 rounded dark:bg-gray-700"></div>
                    <div className="w-3/4 h-6 rounded dark:bg-gray-700"></div>
                </div>
            </div>
        </div>
    }

    if (user) {
        return children;
    }
    return <Navigate state={location.pathname} to='/login'></Navigate>
};

export default PrivateRoute;