import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import axios from "axios";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UserProfile = () => {
    const { user } = useAuth();
    const userEmail = user.email;
    const axiosPublic = useAxiosPublic();

    const { data: usersData = [], refetch } = useQuery({
        queryKey: ['usersData'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        },
        select: (data) => {
            return data.filter(userData => userData.email === userEmail)
        },
    });
    const userInfo = usersData[0];
    //console.log(userInfo);
    //console.log(user);

    const [previewImage, setPreviewImage] = useState(null);
    console.log(previewImage);

    const handleImageChange = async (e) => {
        // Handle image upload logic here
        const file = e.target.files[0];
        // You can use FileReader to display a preview if needed
        if (file) {
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await axios.post(image_hosting_api, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                setPreviewImage(response.data.data.url);
            } catch (error) {
                console.error('Error uploading image:', error);
                // Handle error, show error message, etc.
            }
        }
    };

    const handleProfileUpdate = async (userId) => {
        const updatedUserData = {
            name: userInfo.name,
            email: userInfo.email,
            image: previewImage || userInfo.image,
        };
        axiosPublic.patch(`/users/profileUpdate/${userId}`, updatedUserData)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Profile Updated Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(error => {
                console.error('Error updating profile:', error);
                // Handle error, show error message, etc.
            });
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg text-center">
            <h1 className="text-2xl font-semibold mb-4">My Profile</h1>

            <div className="flex flex-col items-center">
                <img
                    src={previewImage || userInfo?.image}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover mb-4"
                />
                <div>
                    <h2 className="text-xl font-semibold">{userInfo?.name}</h2>
                    <p className="text-gray-600">{userInfo?.email}</p>
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
                onClick={() => handleProfileUpdate(userInfo._id)}
                className="w-full mt-4 bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-indigo-300"
            >
                Update Profile
            </button>
        </div>
    );
};

export default UserProfile;
