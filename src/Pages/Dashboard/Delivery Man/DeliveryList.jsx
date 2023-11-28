import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const DeliveryList = () => {
    const { user } = useAuth();
    const userEmail = user.email;
    const axiosSecure = useAxiosSecure();
    const { data: deliveryParcels = [], refetch } = useQuery({
        queryKey: ['deliveryParcels'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcel');
            return res.data;
        },
        select: (data) => {
            return data.filter(deliveryParcel => deliveryParcel.deliveryMenEmail === userEmail);
        },
    });
    //console.log(deliveryParcels);



    const handleCancel = (parcel) => {
        axiosSecure.patch(`/parcel/cancel/${parcel}`)
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


    const handleDeliver = (parcelId) => {
        // Logic to handle delivering a parcel
        // Make a backend request to update the parcel status to 'Delivered'
        // Show an alert before sending the request
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
                                <td className="border py-2 flex flex-col space-y-1">
                                    {/* Add view location button logic here */}
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded"
                                    >Location</button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded"
                                        onClick={() => handleCancel(parcel._id)}>Cancel</button>
                                    <button className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded"
                                        onClick={() => handleDeliver(parcel._id)}>Deliver</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DeliveryList;
