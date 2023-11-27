import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useDeliveryMen = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isDeliveryMen, isPending: isDeliveryMenLoading } = useQuery({
        queryKey: [user?.email, 'isDeliveryMen'],
        enabled: !loading,
        queryFn: async () => {
            //console.log('asking or checking is Delivery Men', user)
            const res = await axiosSecure.get(`/users/deliveryMen/${user.email}`);
            //console.log(res.data);
            return res.data?.deliveryMen;
        }
    })
    return [isDeliveryMen, isDeliveryMenLoading]
};

export default useDeliveryMen;