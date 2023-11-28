import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import axios from 'axios';

const UserProfile = () => {
    const { user } = useAuth();
    //console.log(user);
    const [profilePicture, setProfilePicture] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleImageChange = (e) => {
        // Handle image upload logic here
        const file = e.target.files[0];
        // You can use FileReader to display a preview if needed
        if (file) {
            setProfilePicture(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('profilePicture', profilePicture);

            // Send the updated information (including the new profile picture) to the server
            await axios.put(`/users/updateProfile/${user._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Optionally, you can refresh the user data or display a success message
        } catch (error) {
            console.error('Error updating profile:', error);
            // Handle error, e.g., display an error message
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg text-center">
            <h1 className="text-2xl font-semibold mb-4">My Profile</h1>

            <div className="flex flex-col items-center">
                <img
                    src={previewImage || user.photoURL} // Use the actual property from your user object
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover mb-4"
                />
                <div>
                    <h2 className="text-xl font-semibold">{user.displayName}</h2>
                    <p className="text-gray-600">{user.email}</p>
                </div>
            </div>
            <div className="my-6">
                <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
                    Upload Profile Picture
                </label>
                <input
                    type="file"
                    id="profilePicture"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                />
            </div>
            <button
                onClick={handleProfileUpdate}
                className="w-full mt-4 bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-indigo-300"
            >
                Update Profile
            </button>
        </div>
    );
};

export default UserProfile;
