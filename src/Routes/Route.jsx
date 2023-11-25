import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import ErrorPage from "../Components/Root/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import AboutUs from "../Components/Contact/Contact";
import LogIn from "../Components/Authentication/Login";
import SignUp from "../Components/Authentication/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layouts/Dashboard";
import UserProfile from "../Pages/Dashboard/User/UserProfile";
import UserParcels from "../Pages/Dashboard/User/UserParcels";
import BookAParcel from "../Pages/Dashboard/User/BookAParcel";
import AllParcel from "../Pages/Dashboard/Admin/AllParcel";
import AllUser from "../Pages/Dashboard/Admin/AllUser";
import AllDeliveryMan from "../Pages/Dashboard/Admin/AllDeliveryMan";
import Statistics from "../Pages/Dashboard/Admin/Statistics";
import DeliveryList from "../Pages/Dashboard/Delivery Man/DeliveryList";
import DeliveryManReviews from "../Pages/Dashboard/Delivery Man/DeliveryManReviews";
import Contact from "../Components/Contact/Contact";
import Settings from "../Pages/Dashboard/Common/Settings";


const Route = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/contact',
                element: <Contact></Contact>
            },
            {
                path: '/logIn',
                element: <LogIn></LogIn>,
            },
            {
                path: '/signUp',
                element: <SignUp></SignUp>,
            },
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [

            // Admin  routes
            {
                path: 'allParcels',
                element: <AllParcel></AllParcel>
            },
            {
                path: 'allUsers',
                element: <AllUser></AllUser>
            },
            {
                path: 'allDeliveryMen',
                element: <AllDeliveryMan></AllDeliveryMan>
            },
            {
                path: 'statistics',
                element: <Statistics></Statistics>
            },

            // User routes
            {
                path: 'userProfile',
                element: <UserProfile></UserProfile>
            },
            {
                path: 'userParcels',
                element: <UserParcels></UserParcels>
            },
            {
                path: 'bookAParcel',
                element: <BookAParcel></BookAParcel>
            },

            // Delivery Man routes
            {
                path: 'deliveryList',
                element: <DeliveryList></DeliveryList>
            },
            {
                path: 'myReviews',
                element: <DeliveryManReviews></DeliveryManReviews>
            },

            // Common routes
            {
                path: 'settings',
                element: <Settings></Settings>
            },

        ]
    }
]);

export default Route;