import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';

const UserParcels = () => {
    const { user } = useAuth();
    const userEmail = user.email;
    const axiosPublic = useAxiosPublic();
    const { data: userParcels = [], refetch } = useQuery({
        queryKey: ['userParcels'],
        queryFn: async () => {
            const res = await axiosPublic.get('/parcel');
            return res.data;
        },
        select: (data) => {
            return data.filter(userParcel => userParcel.senderEmail === userEmail);
        },
    });
    //console.log(userParcels);

    const handleUpdate = (parcelId) => {

        // Redirect user to the update booking page
        // Implement your navigation logic
        window.location.href = (`/parcel/${parcelId}`);
    };

    const handleCancel = async (parcelId) => {
        console.log(parcelId);
        axiosPublic.patch(`/parcel/${parcelId._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "The Booking is Canceled",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

    };

    const handleReview = (parcelId) => {
        // Implement review logic here
        // Check if the parcel status is 'delivered' before showing the review button
        // Show a review modal or navigate to a review page
    };

    const handlePay = (parcelId) => {
        // Implement payment logic here
        // Show a payment modal or navigate to a payment page
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-4xl text-center font-bold mb-4">My Parcels: <span className='text-red-400'>{userParcels.length}</span> </h1>
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-2 py-2">Parcel Type</th>
                        <th className="border px-2 py-2">Requested Delivery Date</th>
                        <th className="border px-2 py-2">Approximate Delivery Date</th>
                        <th className="border px-2 py-2">Booking Date</th>
                        <th className="border px-2 py-2">Delivery Man ID</th>
                        <th className="border px-2 py-2">Booking Status</th>
                        <th className="border px-2 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userParcels.map(parcel => (
                        <tr key={parcel._id}>
                            <td className="border px-2  py-2">{parcel.parcelType}</td>
                            <td className="border px-2 py-2">{parcel.deliveryDate
                            }</td>
                            <td className="border px-2 py-2">{parcel.approximateDeliveryDate}</td>
                            <td className="border px-2 py-2">{parcel.bookingDate}</td>
                            <td className="border px-2 py-2">{parcel.deliveryMenId}</td>
                            <td className="border px-2 py-2">{parcel.bookingStatus}</td>
                            <td className="border px-2 py-2 space-y-2">
                                <button
                                    onClick={() => handleUpdate(parcel._id)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 w-full rounded mr-2"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleCancel(parcel._id)}
                                    className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 w-full  rounded mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleReview(parcel._id)}
                                    className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 w-full  rounded mr-2"
                                >
                                    Review
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4">
                <button
                    onClick={handlePay}
                    className="w-full bg-teal-500 hover:bg-teal-600 font-bold text-black text-xl px-2 py-2 rounded"
                >
                    Pay for All
                </button>
            </div>
        </div>
    );
};

export default UserParcels;

