
import { Rating } from "@smastrom/react-rating";

const ReviewCard = ({ review }) => {
    const { dmId, feedback, image, name, rating, feedbackDate } = (review);
    return (
        <div className="bg-white p-4 rounded-md shadow-xl">
            <img src={image} alt="Review Giver" className="w-full h-auto object-cover mt-2 mb-2 rounded-md" />
            <p ><span className="font-bold">Name:</span> <span className="text-red-600 font-semibold">{name}</span></p>
            <p><span className="font-bold">Date:</span> <span className="text-red-600 font-semibold">{feedbackDate} </span></p>
            <p className="flex space-x-1"><span className="font-bold">Rating:</span> <Rating
                style={{ maxWidth: 90 }}
                value={rating}
                readOnly
            /></p>
            <p><span className="font-bold">Feedback:</span> <span className="text-red-600 font-semibold">{feedback}</span></p>
        </div>
    );
};

export default ReviewCard;
