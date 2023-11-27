import useParcel from '../../../Hooks/useParcel';

const UserParcels = () => {
    const parcel = useParcel();
    const userParcel = parcel[0];

    console.log(userParcel);

    const handleUpdate = (parcelId) => {

        // Redirect user to the update booking page
        // Implement your navigation logic
        window.location.href = (`/parcel/${parcelId}`);
    };

    const handleCancel = async (parcelId) => {


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
            <h1 className="text-4xl text-center font-bold mb-4">My Parcels: <span className='text-red-400'>{userParcel.length}</span> </h1>
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
                    {userParcel.map(parcel => (
                        <tr key={parcel._id}>
                            <td className="border px-2  py-2">{parcel.parcelType}</td>
                            <td className="border px-2 py-2">{parcel.deliveryDate
                            }</td>
                            <td className="border px-2 py-2">{parcel.approximateDeliveryDate}</td>
                            <td className="border px-2 py-2">{parcel.bookingDate}</td>
                            <td className="border px-2 py-2">{parcel.deliveryMenId}</td>
                            <td className="border px-2 py-2">{"Pending"}</td>
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

