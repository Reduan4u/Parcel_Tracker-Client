import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'


const DeliveryManCard = ({ deliveryMan }) => {
    const { dmName, dmImage, parcelsDelivered, averageRating } = deliveryMan;

    return (

        <div className="w-11/12 max-w-7xl mx-auto">
            <section className=" bg-teal-500 rounded-lg">
                <div className="container flex flex-col items-center justify-center p-4 mx-auto sm:p-10">
                    <div className="flex flex-col justify-center w-full px-4 mx-2 my-12 rounded-md  bg-base-100 text-start ">
                        <img alt="" className="self-center flex-shrink-0 w-24 h-24 -mt-12 bg-center bg-cover rounded-full" src={dmImage} />
                        <div className="flex-1 my-4 ">
                            <p className="text-xl font-semibold leadi flex justify-between">Name: <span className="font-bold text-red-400">{dmName}</span></p>
                            <div className="text-xl font-semibold flex justify-between"> Rating:<Rating
                                style={{ maxWidth: 100 }}
                                value={averageRating}
                                readOnly
                            /></div>
                            <div className="text-xl font-semibold flex justify-between"><span>Parcel Delivered:</span> <span className="font-bold text-red-400 ">{parcelsDelivered} </span>
                            </div>


                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default DeliveryManCard;