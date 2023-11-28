import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const DeliveryList = () => {
    const { user } = useAuth();
    const userEmail = user.email;
    const axiosPublic = useAxiosPublic();
    const { data: deliveryParcels = [], refetch } = useQuery({
        queryKey: ['deliveryParcels'],
        queryFn: async () => {
            const res = await axiosPublic.get('/parcel');
            return res.data;
        },
        select: (data) => {
            return data.filter(deliveryParcel => deliveryParcel.deliveryMenEmail === userEmail);
        },
    });
    //console.log(deliveryParcels);



    const handleCancel = (parcel) => {
        console.log(parcel);
        axiosPublic.patch(`/parcel/cancel/${parcel}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "This Booking is Cancelled",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    };


    const handleDeliver = (parcelId, dmId) => {
        axiosPublic.patch(`/parcel/deliver/${parcelId}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    axiosPublic.patch(`/deliverCount/${dmId}`)
                        .then(res => {
                            console.log(res.data);
                        })
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "The Booking is Delivered",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    };

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-4xl font-bold mb-4">My Delivery List</h2>

            <div className='overflow-x-auto'>
                <table className="table table-xs table-pin-rows table-pin-cols">
                    <thead>
                        <tr>
                            <th className='text-center' >S.N</th>
                            <th className='text-center'>Booked <br />User's <br />Name</th>
                            <th className='text-center' >Booked <br />User's <br />Phone</th>
                            <th className='text-center' >Receivers <br />Name</th>
                            <th className='text-center' >Receivers <br />Phone <br />Number</th>
                            <th className='text-center' >Receivers <br />Address</th>
                            <th className='text-center' >Requested <br />Delivery <br />Date</th>
                            <th className='text-center' >Approximate <br />Delivery <br />Date</th>
                            <th className='text-center' >Status</th>
                            <th className='text-center' >Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {deliveryParcels.map((parcel, index) => (
                            <tr key={parcel._id} className="hover">
                                <td className="border">{index + 1}</td>
                                <td className="border">{parcel.senderName}</td>
                                <td className="border">{parcel.senderNumber}</td>
                                <td className="border">{parcel.receiverName}</td>
                                <td className="border">{parcel.receiverNumber}</td>
                                <td className="border">{parcel.receiverAddress}</td>
                                <td className="border">{parcel.deliveryDate}</td>
                                <td className="border">{parcel.approximateDeliveryDate}</td>
                                <td className="border">{parcel.bookingStatus}</td>
                                <td className="border py-2 flex flex-col space-y-1">
                                    {/* Add view location button logic here */}

                                    <button className="bg-blue-500 hover:bg-blue-700  text-white px-2 py-1 rounded"
                                    >Location</button>


                                    {
                                        parcel.bookingStatus === "On The Way" ? <button
                                            className="bg-red-500 hover:bg-red-700 text-white  px-2 py-1 rounded"
                                            onClick={() => handleCancel(parcel._id)}
                                        >
                                            Cancel
                                        </button> : ""
                                    }


                                    {
                                        parcel.bookingStatus === "On The Way" ? <button className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded"
                                            onClick={() => handleDeliver(parcel._id, parcel.deliveryMenId)}>Deliver</button> : ""
                                    }

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default DeliveryList;
