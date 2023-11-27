import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useParcel = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcel?email=${user.email}`);
            return res.data;
        }
    })
    return [cart, refetch]
};

export default useParcel;