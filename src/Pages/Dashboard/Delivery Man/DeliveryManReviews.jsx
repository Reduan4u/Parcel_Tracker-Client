// ReviewsPage.js
import { useQuery } from '@tanstack/react-query';
import ReviewCard from './ReviewCard';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAuth from '../../../Hooks/useAuth';

const DeliveryManReviews = () => {
    const { user } = useAuth();
    const userEmail = user.email;
    const axiosPublic = useAxiosPublic();
    // Use the appropriate hook or method to get the reviews for the logged-in delivery man
    const { data: allData = [], refetch } = useQuery({
        queryKey: ['allData'],
        queryFn: async () => {
            // Fetch reviews for the logged-in delivery man
            const res = await axiosPublic.get('/users'); // Replace with your actual API endpoint
            return res.data;
        },
        select: (data) => {
            return data.find(data => data.email === userEmail)
        },
    });
    const reviewsData = allData.reviews;
    //console.log(reviewsData);
    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-4xl font-bold mb-4">Reviews for Delivery Man</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    reviewsData ? <>
                        {reviewsData.map((review, index) => (
                            <ReviewCard key={index} review={review} />
                        ))}</>
                        :
                        <>
                            <div>
                                <h1>No Reviews available</h1>
                            </div>
                        </>
                }
            </div>
        </div>
    );
};

export default DeliveryManReviews;
