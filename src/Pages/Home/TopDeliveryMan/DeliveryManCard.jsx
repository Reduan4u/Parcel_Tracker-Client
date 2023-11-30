import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'


const DeliveryManCard = ({ deliveryMan }) => {
    const { name, image, deliveryCount, reviews } = (deliveryMan);
    //console.log(reviews);
    const allReviews = reviews;

    const calculateAverageRating = (allReviews) => {
        if (allReviews.length === 0) {
            return 0; // Return 0 if there are no reviews to avoid division by zero
        }

        const sumOfRatings = allReviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = sumOfRatings / allReviews.length;

        return averageRating;
    };

    const averageRating = calculateAverageRating(allReviews);
    //console.log('Average Rating:', averageRating);

    return (

        <div className="w-11/12 max-w-7xl mx-auto">
            <section className=" bg-teal-500 rounded-lg">
                <div className="container flex flex-col items-center justify-center p-4 mx-auto sm:p-10">
                    <div className="flex flex-col justify-center w-full px-4 mx-2 my-12 rounded-md  bg-base-100 text-start ">
                        <img alt="" className="self-center flex-shrink-0 w-32 h-auto -mt-12 bg-center bg-cover rounded-full" src={image} />
                        <div className="flex-1 my-4 ">
                            <p className="text-xl font-semibold leadi flex space-x-2"><span>Name:</span> <span className="font-bold text-red-400">{name}</span></p>
                            <div className="text-xl font-semibold flex "> Ratings:<Rating
                                className='pl-2'
                                style={{ maxWidth: 100 }}
                                value={averageRating}
                                readOnly
                            /></div>
                            <div className="text-xl font-semibold space-x-2"><span>Delivered:</span> <span className="font-bold text-red-400 ">{deliveryCount} </span>
                            </div>


                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default DeliveryManCard;