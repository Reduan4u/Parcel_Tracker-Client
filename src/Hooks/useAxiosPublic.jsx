import axios from "axios";

const axiosPublic = axios.create({
    //baseURL: 'https://parcel-tracker-server-reduan4u-reduanul-haques-projects.vercel.app'
    baseURL: 'http://localhost:5000'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;