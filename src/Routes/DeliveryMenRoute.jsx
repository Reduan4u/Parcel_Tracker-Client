import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useDeliveryMen from "../Hooks/useDeliveryMen";


const DeliveryMenRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isDeliveryMen, isDeliveryMenLoading] = useDeliveryMen();
    const location = useLocation();

    if (loading || isDeliveryMenLoading) {
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

    if (user && isDeliveryMen) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

};

export default DeliveryMenRoute;