import { Rating } from '@smastrom/react-rating';
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


    // console.log(deliveryMen);
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
                    {deliveryMen.map((deliveryMan, index) => {
                        // Calculate average review rating
                        const averageRating = deliveryMan.reviews.length > 0
                            ? deliveryMan.reviews.reduce((sum, review) => sum + review.rating, 0) / deliveryMan.reviews.length
                            : 0;

                        return (
                            <tr key={deliveryMan._id}>
                                <td className="border px-2 py-2">{index + 1}</td>
                                <td className="border px-2 py-2">{deliveryMan.name}</td>
                                <td className="border px-2 py-2">{deliveryMan.email}</td>
                                <td className="border px-2 py-2 text-center">{deliveryMan.deliveryCount ? deliveryMan.deliveryCount : "0"}</td>
                                <td className="border px-2 py-2 text-center">{averageRating ?
                                    <><Rating
                                        style={{ maxWidth: 180 }}
                                        value={averageRating}
                                        readOnly
                                    /></>
                                    :
                                    <><Rating
                                        style={{ maxWidth: 180 }}
                                        value=""
                                        readOnly
                                    /></>}</td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>
        </div>
    );
};

export default AllDeliveryMan;
