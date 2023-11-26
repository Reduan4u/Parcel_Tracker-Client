import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const UserParcels = () => {
    const axiosInstance = useAxiosPublic();
    const [parcels, setParcels] = useState([]);

    useEffect(() => {
        // Fetch parcels data for the logged-in user
        axiosInstance.get('/parcel') // Update the endpoint based on your API
            .then(response => {
                setParcels(response.data);
            })
            .catch(error => {
                console.error('Error fetching parcels:', error);
            });
    }, [axiosInstance]);
    console.log(parcels);
    const handleUpdate = (parcelId) => {
        // Redirect user to the update booking page
        // Implement your navigation logic
        // Example: history.push(`/update-booking/${parcelId}`);
    };

    const handleCancel = (parcelId) => {
        // Implement cancellation logic here
        // You may want to show a confirmation dialog before canceling
        // Update the parcel status to 'cancelled' in the backend
        // Reload the parcels data after cancellation
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
            <h1 className="text-4xl text-center font-bold mb-4">My Parcels</h1>
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
                    {parcels.map(parcel => (
                        <tr key={parcel._id}>
                            <td className="border px-2  py-2">{parcel.parcelType}</td>
                            <td className="border px-2 py-2">{parcel.deliveryDate
                            }</td>
                            <td className="border px-2 py-2">{parcel.approximateDeliveryDate}</td>
                            <td className="border px-2 py-2">{parcel.bookingDate ? parcel.bookingDate : "Null"}</td>
                            <td className="border px-2 py-2">{parcel.deliveryMenId}</td>
                            <td className="border px-2 py-2">{"Pending"}</td>
                            <td className="border px-2 py-2">
                                {parcel.bookingStatus === 'pending' && (
                                    <>
                                        <button
                                            onClick={() => handleUpdate(parcel._id)}
                                            className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded mr-2"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleCancel(parcel._id)}
                                            className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded mr-2"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                )}
                                {parcel.bookingStatus === 'delivered' && (
                                    <button
                                        onClick={() => handleReview(parcel._id)}
                                        className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded mr-2"
                                    >
                                        Review
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4">
                <button
                    onClick={handlePay}
                    className="w-full bg-red-500 hover:bg-red-700 text-white px-2 py-2 rounded"
                >
                    Pay for All
                </button>
            </div>
        </div>
    );
};

export default UserParcels;

