import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ReviewModal from './ReviewModal';

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



    const { data: usersData = [] } = useQuery({
        queryKey: ['usersData'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        },
        select: (data) => {
            return data.find(userData => userData.email === userEmail)
        },
    });
    //console.log(usersData);

    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [deliveryManId, setDeliveryManId] = useState(null);
    const [parcelsId, setParcelsId] = useState(null);
    //console.log(parcelsId);
    const handleReview = (deliveryManId, parcelId) => {
        setDeliveryManId(deliveryManId);
        setParcelsId(parcelId)
        setReviewModalOpen(true);
    };

    const handleCloseReviewModal = () => {
        setReviewModalOpen(false);
    };

    const handleSubmitReview = (reviewData) => {
        axiosPublic.patch(`/user/review/${reviewData.dmId}`, reviewData)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    console.log(parcelsId);
                    axiosPublic.patch(`/parcel/reviewed/${parcelsId}`)
                        .then(res => {
                            console.log(res.data);
                        })
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Review Submitted Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
        console.log('Review submitted:', reviewData);
    };

    const handleCancel = (parcelId) => {
        // console.log(parcelId);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/parcel/cancel/${parcelId}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Cancelled!",
                                text: "Your parcel has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };



    const handlePay = (parcelId) => {
        // Implement payment logic here
        // Show a payment modal or navigate to a payment page
    };


    /* Filtering */
    const [filterStatus, setFilterStatus] = useState('all');

    const filteredParcels = userParcels.filter(parcel => {
        if (filterStatus === 'all') {
            return true; // Show all parcels
        } else {
            return parcel.bookingStatus === filterStatus;
        }
    });

    // Calculate total cost for all parcels
    const totalCost = useMemo(() => {
        return userParcels.reduce((sum, parcel) => sum + parseFloat(parcel.parcelCost), 0);
    }, [userParcels]);
    //console.log(totalCost);


    return (
        <div className="container mx-auto mt-8">
            <div className='flex justify-between'>
                <h1 className="text-4xl text-left font-bold mb-4">My Parcels: <span className='text-red-400'>{userParcels.length}</span> </h1>
                <h1 className="text-4xl text-right font-bold mb-4">Total Cost: <span className='text-red-400'>${totalCost}</span>  </h1>
            </div>
            {/* Filtering */}
            <div className="my-4 text-center">
                <label htmlFor="statusFilter" className="mr-2 font-semibold text-xl">Filter by Status:</label>
                <select
                    id="statusFilter"
                    onChange={(e) => setFilterStatus(e.target.value)}
                    value={filterStatus}
                    className="p-2 border-2 border-gray-400 rounded-lg"
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="On The Way">On The Way</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                    {/* Add other status options as needed */}
                </select>
            </div>
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-2 py-2">S.N</th>
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
                    {filteredParcels.map((parcel, index) => (
                        <tr key={parcel._id}>
                            <td className="border px-2  py-2 text-gray-600">{index + 1}</td>
                            <td className="border px-2  py-2">{parcel.parcelType}</td>
                            <td className="border px-2 py-2">{parcel.deliveryDate
                            }</td>
                            <td className="border px-2 py-2">{parcel.approximateDeliveryDate}</td>
                            <td className="border px-2 py-2">{parcel.bookingDate}</td>
                            <td className="border px-2 py-2">{parcel.deliveryMenId}</td>
                            <td className="border px-2 py-2">{parcel.bookingStatus}</td>
                            <td className="border px-2 py-2 space-y-2">

                                {
                                    parcel.bookingStatus === "delivered" ?
                                        <>
                                            <button
                                                onClick={() => handleReview(parcel.deliveryMenId, parcel._id)}
                                                className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 w-full  rounded mr-2"
                                            >
                                                Review
                                            </button>
                                        </>
                                        :
                                        <>
                                            <Link to={`/dashboard/parcelUpdate/${parcel._id}`}>
                                                <button
                                                    className={`bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 w-full rounded mr-2 ${parcel.bookingStatus !== "pending" ? "opacity-50 cursor-not-allowed" : ""}`}
                                                    disabled={parcel.bookingStatus !== "pending"}
                                                >
                                                    Update
                                                </button></Link>

                                            <button
                                                onClick={() => handleCancel(parcel._id)}
                                                className={`bg-red-500 hover:bg-red-700 text-white px-2 py-1 w-full rounded mr-2 ${parcel.bookingStatus !== "pending" ? "opacity-50 cursor-not-allowed" : ""}`}
                                                disabled={parcel.bookingStatus !== "pending"}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                }

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
            {/* Review Modal */}
            <ReviewModal
                isOpen={reviewModalOpen}
                onClose={handleCloseReviewModal}
                onSubmit={handleSubmitReview}
                dmId={deliveryManId}
                name={usersData.name}
                image={usersData.image}
            />

        </div >
    );
};

export default UserParcels;

