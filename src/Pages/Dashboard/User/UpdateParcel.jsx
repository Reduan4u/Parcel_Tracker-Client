import useAuth from "../../../Hooks/useAuth";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateParcel = () => {
    const parcel = useLoaderData();
    const { user } = useAuth();
    const axiosInstance = useAxiosSecure();
    const senderName = user.displayName;
    const senderEmail = user.email;
    //console.log(parcel);

    //Update

    const [parcelWeight, setParcelWeight] = useState('');
    const handleParcelWeightChange = (event) => {
        const weight = parseFloat(event.target.value) || '';
        setParcelWeight(weight);
    };
    const calculateCost = () => {
        const weight = parseFloat(parcelWeight);
        if (!isNaN(weight)) {
            if (weight === 1) {
                return 50;
            } else if (weight === 2) {
                return 100;
            } else if (weight > 2) {
                return 150;
            }
        }
        return 0;
    }
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    const bookingDate = `${year}-${month}-${day}`;
    //console.log(bookingDate);

    const handleUpdate = event => {
        event.preventDefault();
        const form = event.target;
        const senderNumber = form.elements.senderNumber.value;
        const parcelWeight = form.elements.parcelWeight.value;
        const parcelType = form.elements.parcelType.value;
        const receiverName = form.elements.receiverName.value;
        const receiverNumber = form.elements.receiverNumber.value;
        const receiverAddress = form.elements.receiverAddress.value;
        const addressLatitude = form.elements.addressLatitude.value;
        const addressLongitude = form.elements.addressLongitude.value;
        const deliveryDate = form.elements.deliveryDate.value;
        const parcelCost = form.elements.parcelCost.value;
        const bookingStatus = "pending";
        const approximateDeliveryDate = "processing";
        const deliveryMenId = "processing";
        const deliveryMenEmail = "processing";

        const newParcel = { senderName, senderEmail, senderNumber, parcelWeight, parcelType, receiverName, receiverNumber, receiverAddress, addressLatitude, addressLongitude, deliveryDate, parcelCost, bookingDate, bookingStatus, approximateDeliveryDate, deliveryMenId, deliveryMenEmail };
        //console.log(newParcel);

        axiosInstance.patch(`/parcel/update/${parcel._id}`, newParcel)
            .then(res => {
                const data = res.data;
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Parcel Updated Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    form.reset();
                }
            })
            .catch(error => {
                console.error('Error Updating parcel:', error);
            });

    }
    return (
        <div>
            <div className="flex py-4 rounded-lg bg-gray-100">
                <div className="m-auto ">
                    <div className="w-1/2 mx-auto">
                        <button type="button" className="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-900  focus:outline-none   transition duration-300 transform.elements active:scale-95 ease-in-out">
                            <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
                                <g>
                                    <rect fill="none" height="24" width="24"></rect>
                                </g>
                                <g>
                                    <g>
                                        <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z"></path>
                                    </g>
                                </g>
                            </svg>
                            <span className="pl-2 mx-1">Update A Parcel</span>
                        </button>
                    </div>

                    <div className="my-5 w-10/12 mx-auto bg-white rounded-lg shadow">
                        <div className="flex">
                            <div className="flex-1 py-5 pl-5 overflow-hidden">
                                <svg className="inline align-text-top" height="24px" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                    <g>
                                        <path d="m4.88889,2.07407l14.22222,0l0,20l-14.22222,0l0,-20z" fill="none" id="svg_1" stroke="null"></path>
                                        <path d="m7.07935,0.05664c-3.87,0 -7,3.13 -7,7c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zm-5,7c0,-2.76 2.24,-5 5,-5s5,2.24 5,5c0,2.88 -2.88,7.19 -5,9.88c-2.08,-2.67 -5,-7.03 -5,-9.88z" id="svg_2"></path>
                                        <circle cx="7.04807" cy="6.97256" r="2.5" id="svg_3"></circle>
                                    </g>
                                </svg>
                                <h1 className="inline text-2xl font-semibold leading-none">Sender</h1>
                            </div>
                        </div>
                        <form onSubmit={handleUpdate}>
                            <div className="px-5 pb-5 space-y-2">
                                <div>
                                    <label className=" font-bold pl-1">Name:</label>
                                    <input defaultValue={parcel?.senderName} readOnly className=" text-gray-700 font-medium w-full px-4 py-2.5  text-base   transition duration-500 ease-in-out transform.elements border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" />
                                </div>
                                <div>
                                    <label className=" font-bold pl-1">Email:</label>
                                    <input defaultValue={parcel?.senderEmail} readOnly className=" text-gray-700 font-medium w-full px-4 py-2.5  text-base   transition duration-500 ease-in-out transform.elements border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" />
                                </div>
                                <div>
                                    <label className=" font-bold pl-1">Phone:</label>
                                    <input
                                        name="senderNumber"
                                        placeholder={parcel.senderNumber} type="number" className=" text-black font-medium w-full px-4 py-2.5  text-base   transition duration-500 ease-in-out transform.elements border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" />
                                </div>

                                <div className="flex">
                                    <div className="w-2/5 pr-2">
                                        <label className=" font-bold pl-1">Weight:</label>
                                        <input
                                            name="parcelWeight"
                                            placeholder={parcel.parcelWeight}
                                            value={parcelWeight}
                                            onChange={handleParcelWeightChange}
                                            type="number"
                                            className=" text-black font-medium w-full px-4 py-2.5  text-base   transition duration-500 ease-in-out transform.elements border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" />
                                    </div>
                                    <div className="flex-grow" >
                                        <label className=" font-bold pl-1">Type:</label>
                                        <input
                                            name="parcelType"
                                            placeholder={parcel.parcelType}
                                            type="text"
                                            className=" text-black font-medium w-full px-4 py-2.5  text-base   transition duration-500 ease-in-out transform.elements border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" />
                                    </div>
                                </div>

                                <div className="mt-5 bg-white rounded-lg shadow">
                                    <div className="flex-1 py-5 pl-5 overflow-hidden">
                                        <svg className="inline align-text-top" width="21" height="20.5" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                            <g>
                                                <path d="m4.88889,2.07407l14.22222,0l0,20l-14.22222,0l0,-20z" fill="none" id="svg_1" stroke="null"></path>
                                                <path d="m7.07935,0.05664c-3.87,0 -7,3.13 -7,7c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zm-5,7c0,-2.76 2.24,-5 5,-5s5,2.24 5,5c0,2.88 -2.88,7.19 -5,9.88c-2.08,-2.67 -5,-7.03 -5,-9.88z" id="svg_2"></path>
                                                <circle cx="7.04807" cy="6.97256" r="2.5" id="svg_3"></circle>
                                            </g>
                                        </svg>
                                        <h1 className="inline text-2xl font-semibold leading-none">Receiver</h1>
                                    </div>


                                    <div className="px-5 pb-5 space-y-2">
                                        <div>
                                            <label className=" font-bold pl-1">Name:</label>
                                            <input
                                                name="receiverName"
                                                placeholder={parcel.receiverName}
                                                type="text"
                                                className=" text-black font-medium w-full px-4 py-2.5  text-base   transition duration-500 ease-in-out transform.elements border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" />
                                        </div>
                                        <div>
                                            <label className=" font-bold pl-1">Phone:</label>
                                            <input
                                                name="receiverNumber"
                                                placeholder={parcel.receiverNumber}
                                                type="number"
                                                className=" text-black font-medium w-full px-4 py-2.5  text-base   transition duration-500 ease-in-out transform.elements border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" />
                                        </div>
                                        <div>
                                            <label className=" font-bold pl-1">Address:</label>
                                            <input
                                                name="receiverAddress"
                                                placeholder={parcel.receiverAddress}
                                                type="text"
                                                className=" text-black font-medium w-full px-4 py-2.5  text-base   transition duration-500 ease-in-out transform.elements border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" />
                                        </div>

                                        <div className="flex space-x-2">
                                            <div className="">
                                                <label className=" font-bold pl-1">Address Latitude:</label>

                                                <input
                                                    name="addressLatitude"
                                                    placeholder={parcel.addressLatitude}
                                                    type="number"
                                                    className=" text-black font-medium w-full px-4 py-2.5  text-base   transition duration-500 ease-in-out transform.elements border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" />
                                            </div>
                                            <div className="">
                                                <label className=" font-bold pl-1">Address Longitude:</label>
                                                <input
                                                    name="addressLongitude"
                                                    placeholder={parcel.addressLongitude}
                                                    type="number"
                                                    className=" text-black font-medium w-full px-4 py-2.5  text-base   transition duration-500 ease-in-out transform.elements border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" />
                                            </div>
                                        </div>
                                        <div className="flex justify-center items-center space-x-2">
                                            <div className="w-1/2">
                                                <label className=" font-bold pl-1">Requested Delivery:</label>
                                                <input
                                                    name="deliveryDate"
                                                    type="date"
                                                    className=" text-black font-medium w-full px-4 py-2.5  text-base   transition duration-500 ease-in-out transform.elements border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" />
                                            </div>
                                            <div className="w-1/2">
                                                <label className=" font-bold pl-1">Cost:</label>
                                                <input
                                                    name="parcelCost"
                                                    placeholder={parcel.parcelCost}
                                                    value={calculateCost()}
                                                    readOnly
                                                    type="number"
                                                    className=" text-red-500 font-bold w-full px-4 py-2.5  text-xl   transition duration-500 ease-in-out transform.elements border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center py-3">
                                <button type="submit" className="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform.elements active:scale-95 ease-in-out">
                                    <span className="pl-2 mx-1">UPDATE PARCEL</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default UpdateParcel;