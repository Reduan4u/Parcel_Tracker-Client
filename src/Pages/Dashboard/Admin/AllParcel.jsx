import { useState, useEffect } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Modal from 'react-modal';

const AllParcel = () => {
    const axiosSecure = useAxiosSecure();
    const [parcels, setParcels] = useState([]);
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [deliveryMen, setDeliveryMen] = useState([]);
    const [selectedDeliveryMan, setSelectedDeliveryMan] = useState('');
    const [approximateDeliveryDate, setApproximateDeliveryDate] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');


    useEffect(() => {
        // Fetch all parcels data
        axiosSecure.get('/parcel')
            .then(response => {
                setParcels(response.data);
            })
            .catch(error => {
                console.error('Error fetching all parcels:', error);
            });

        // Fetch delivery men
        axiosSecure.get('/deliveryMan')
            .then(response => {
                setDeliveryMen(response.data);
            })
            .catch(error => {
                console.error('Error fetching delivery men:', error);
            });
    }, [axiosSecure]);

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    };

    const handleManage = (parcelId) => {
        const selected = parcels.find(parcel => parcel._id === parcelId);
        setSelectedParcel(selected);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAssignDeliveryMan = () => {
        // Make API call to assign delivery man
        axiosSecure.put(`/manageParcel/${selectedParcel}`, {
            deliveryManId: selectedDeliveryMan,
            approximateDeliveryDate: approximateDeliveryDate,
        }).then(response => {
            // Handle success, close the modal, and update the parcels
            console.log(response.data);
            setIsModalOpen(false);
            setParcels(updatedParcels); // Update with the new parcels
        }).catch(error => {
            console.error('Error managing parcel:', error);
            // Handle error
        });
    };
    const handleSearchByDateRange = () => {
        // Make API call to search by date range
        axiosSecure.get('/parcel', {
            params: {
                fromDate: fromDate,
                toDate: toDate,
            },
        }).then(response => {
            // Filter parcels based on requested delivery date

            setParcels(response.data);
            console.log(response.data);
        }).catch(error => {
            console.error('Error searching by date range:', error);
            // Handle error
        });
    };

    //console.log(parcels);

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-4xl text-center font-bold mb-4">All Parcels: <span className='text-red-400'>{parcels.length}</span> </h1>

            {/* Search */}
            <div className='mb-6 bg-teal-200 p-2 rounded-lg flex justify-between items-center'>
                <div>
                    <label className='text-xl font-semibold pr-2' htmlFor="fromDate">From:</label>
                    <input
                        className='border-2 border-gray-600 rounded-lg p-2'
                        type="date"
                        id="fromDate"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="toDate" className='text-xl font-semibold pr-2'>To:</label>
                    <input
                        className='border-2 border-gray-600 rounded-lg p-2'

                        type="date"
                        id="toDate"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                    />
                </div>
                <div>
                    <button className='btn btn-info' onClick={handleSearchByDateRange}>Search</button>
                </div>
            </div>

            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-2 py-2">#</th>
                        <th className="border px-2 py-2">User's Name</th>
                        <th className="border px-2 py-2">User's Phone</th>
                        <th className="border px-2 py-2">Booking Date</th>
                        <th className="border px-2 py-2">Requested Delivery Date</th>
                        <th className="border px-2 py-2">Cost</th>
                        <th className="border px-2 py-2">Status</th>
                        <th className="border px-2 py-2">Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {parcels.map((parcel, index) => (
                        <tr key={parcel._id}>
                            <td className="border px-2 py-2">{index + 1}</td>
                            <td className="border px-2 py-2">{parcel.senderName}</td>
                            <td className="border px-2 py-2">{parcel.senderNumber}</td>
                            <td className="border px-2 py-2">{parcel.bookingDate ? formatDate(parcel.bookingDate) : "Null"}</td>
                            <td className="border px-2 py-2">{parcel.deliveryDate ? formatDate(parcel.deliveryDate) : "Null"}</td>
                            <td className="border px-2 py-2">${parcel.parcelCost}</td>
                            <td className="border px-2 py-2">{parcel.bookingStatus}</td>
                            <td className="border px-2 py-2">
                                {/* Add manage button logic here */}
                                <button
                                    onClick={() => handleManage(parcel._id)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded mr-2"
                                >
                                    Manage
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            {/* Modal for managing parcel */}
            {/* Manage Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Manage Parcel"
            >
                <div className="modal-content w-1/2 m-auto bg-teal-300 p-6 max-h-screen rounded-xl mt-24">
                    <h2 className='font-bold text-3xl text-center mb-10 underline-offset-8 underline'>Manage Parcel</h2>
                    <div className='my-6'>
                        <label htmlFor="deliveryMan" className='font-bold text-2xl text-center pr-4'>Select Delivery Man:</label>
                        <select
                            className='border-2 border-gray-400 rounded-lg p-2'
                            id="deliveryMan"
                            value={selectedDeliveryMan}
                            onChange={(e) => setSelectedDeliveryMan(e.target.value)}
                        >
                            <option value="" >Select Delivery Man</option>
                            {deliveryMen.map(deliveryMan => (
                                <option key={deliveryMan._id} value={deliveryMan._id}>{deliveryMan.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className='font-bold text-2xl text-center pr-4' htmlFor="approximateDeliveryDate">Approximate Delivery Date:</label>
                        <input className='border-2 border-gray-400 rounded-lg p-2'
                            type="date"
                            id="approximateDeliveryDate"
                            value={approximateDeliveryDate}
                            onChange={(e) => setApproximateDeliveryDate(e.target.value)}
                        />
                    </div>
                    <div className='my-6 flex justify-center'>
                        <button className='btn btn-success' onClick={handleAssignDeliveryMan}>Assign Delivery Man</button>
                    </div>
                    <hr />
                    <div className='flex justify-center mt-6'>
                        <button className='btn btn-error  ' onClick={() => setIsModalOpen(false)}>Close</button>
                    </div>
                </div>
            </Modal>

        </div >
    );
};

export default AllParcel;

