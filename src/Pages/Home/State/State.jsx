import { useQuery } from "@tanstack/react-query";
import CountUp from 'react-countup';
import useAxiosPublic from "../../../Hooks/useAxiosPublic";


const State = () => {
    const axiosPublic = useAxiosPublic();
    const { data: users = [], refetch: refetchUsers } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        },
        select: (data) => {
            //console.log(data);
            // Filter users with "user" role
            return data;
        },

    });

    const { data: parcels = [], refetch: refetchParcels } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const res = await axiosPublic.get('/parcel');
            return res.data;
        },
        select: (data) => {
            // console.log(data);
            // Filter users with "user" role
            return data;
        },

    });
    const { data: deliveredParcels = [], refetch: refetchDeliveredParcels } = useQuery({
        queryKey: ['deliveredParcels'],
        queryFn: async () => {
            const res = await axiosPublic.get('/parcel');
            return res.data;
        },
        select: (data) => {
            // console.log(data);
            // Filter users with "user" role
            return data.filter(user => user.bookingStatus === 'delivered');
        },

    });
    //console.log(deliveredParcels);



    return (
        <div>
            <section className="p-6 w-11/12 max-w-7xl mx-auto my-10 bg-teal-500 rounded-lg ">
                <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-3">
                    {/* 1st Statistics */}
                    <div className="flex justify-around p-4 space-x-4 rounded-lg md:space-x-6 bg-base-100 ">
                        <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-teal-300">
                            <img className="h-32 w-32" src="https://assets-global.website-files.com/6153505f6048ea69cba70145/62c2f80558834637cc5b2391_PO%20Extraction.png" alt="" />
                        </div>
                        <div className="flex flex-col justify-center align-middle ">
                            <p className="text-4xl font-bold text-red-500 text-center  "><CountUp end={parcels.length} duration={3} /></p>
                            <p className="capitalize">Parcel Booked</p>
                        </div>
                    </div>
                    {/* 2nd Statistics */}
                    <div className="flex justify-around p-4 space-x-4 rounded-lg md:space-x-6 bg-base-100 ">
                        <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-teal-300">
                            <img className="h-32 w-32" src="https://assets-global.website-files.com/6153505f6048ea69cba70145/62cc74662afd139d085d0b72_Off%20Page%20muilti%20hop-p-500.png" alt="" />
                        </div>
                        <div className="flex flex-col justify-center align-middle ">
                            <p className="text-4xl font-bold text-red-500 text-center  "><CountUp end={deliveredParcels.length} duration={3} /></p>
                            <p className="capitalize">Parcel Delivered</p>
                        </div>
                    </div>
                    {/* 3rd Statistics */}
                    <div className="flex justify-around p-4 space-x-4 rounded-lg md:space-x-6 bg-base-100 ">
                        <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-teal-300">
                            <img className="h-32 w-32" src="https://assets-global.website-files.com/6153505f6048ea69cba70145/618864afa8f201cb7e8c89eb_Digital%20Log%20-%20Searchable%20Log.png" alt="" />
                        </div>
                        <div className="flex flex-col justify-center align-middle ">
                            <p className="text-4xl font-bold text-red-500 text-center  "><CountUp end={users.length} duration={3} /></p>
                            <p className="capitalize">Active User</p>
                        </div>
                    </div>


                </div>
            </section>
        </div>
    );
};

export default State;