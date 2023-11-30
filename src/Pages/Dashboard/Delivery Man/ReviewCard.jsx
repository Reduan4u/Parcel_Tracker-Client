// ReviewCard.js

const ReviewCard = ({ review }) => {
    const { dmId, feedback, image, name, rating, feedbackDate } = (review);
    return (
        <div className="bg-white p-4 rounded-md shadow-md">
            <p className="font-semibold">Review Giver's Name: {name}</p>
            <img src={image} alt="Review Giver" className="w-full h-32 object-cover mt-2 mb-2 rounded-md" />
            <p>Review Giving Date: {feedbackDate}</p>
            <p>Rating out of 5: {rating}</p>
            <p>Feedback Text: {feedback}</p>
        </div>
    );
};

export default ReviewCard;
