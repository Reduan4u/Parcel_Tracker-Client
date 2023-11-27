import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AllDeliveryMan = () => {
    const axiosSecure = useAxiosSecure();
    const { data: deliveryMen = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
        select: (data) => {
            // Filter users with "user" role
            return data.filter(user => user.role === 'DeliveryMen');
        },

    });

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-4xl text-center font-bold mb-4">All Delivery Men: <span className='text-red-400'>{deliveryMen.length}</span></h1>
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-2 py-2">S.N</th>
                        <th className="border px-2 py-2">Delivery Man's Name</th>
                        <th className="border px-2 py-2">Email</th>
                        <th className="border px-2 py-2">Number of Parcel Delivered</th>
                        <th className="border px-2 py-2">Average Review</th>
                    </tr>
                </thead>
                <tbody>
                    {deliveryMen.map((deliveryMan, index) => (
                        <tr key={deliveryMan._id}>
                            <td className="border px-2 py-2">{index + 1}</td>
                            <td className="border px-2 py-2">{deliveryMan.name}</td>
                            <td className="border px-2 py-2">{deliveryMan.email}</td>
                            <td className="border px-2 py-2">{deliveryMan.parcelDelivered?.length}</td>
                            {/* Logic to calculate average review */}
                            <td className="border px-2 py-2">{/* Display average review */}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllDeliveryMan;
