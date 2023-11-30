import { useState } from 'react';
import Modal from 'react-modal';

const ReviewModal = ({ isOpen, onClose, onSubmit, dmId, name, image }) => {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const feedbackDate = `${year}-${month}-${day}`;
    //console.log(feedbackDate);

    const handleSubmit = () => {
        // Call the onSubmit function with the review data
        onSubmit({
            rating: Number(rating),
            feedback,
            feedbackDate,
            dmId,
            name,
            image
        });

        // Close the modal
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Review Modal"
        >
            <h2 className='text-center font-bold text-5xl text-green-600 underline underline-offset-4'>SUBMIT REVIEW</h2>
            <div className='mt-10 flex flex-col w-1/2 m-auto bg-teal-400 p-6 space-y-2 rounded-xl'>
                <p className='border-2 border-gray-500 p-2 rounded-lg'><span className='font-semibold'>User's Name:</span> {name}</p>
                <p className='border-2 border-gray-500 p-2 rounded-lg'><span className='font-semibold'>User's Image:</span> {image}</p>
                <p className='border-2 border-gray-500 p-2 rounded-lg'><span className='font-semibold'>Delivery Man's Id:</span> {dmId}</p>

                <div className='flex flex-col'>
                    <label className='font-semibold'>Feedback:</label>
                    <textarea className='border-2 border-gray-500 p-2 rounded-lg'
                        value={feedback}
                        placeholder='Write your feedback here...'
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                </div>
                <div className='space-x-4 flex justify-between'>
                    <div className=' space-x-4'>
                        <label className=' font-semibold'>Rating out of 5:</label>
                        <input
                            className=' rounded-lg p-2 w-10'
                            type="number"
                            min="0"
                            max="5"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        />
                    </div>
                    <button className='btn btn-secondary' onClick={handleSubmit}>Submit</button>
                </div>

            </div>


        </Modal>
    );
};

export default ReviewModal;
