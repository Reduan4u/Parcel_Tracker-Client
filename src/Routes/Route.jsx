import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import ErrorPage from "../Components/Root/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
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
import AdminRoute from "./AdminRoute";
import DeliveryMenRoute from "./DeliveryMenRoute";
import UpdateParcel from "../Pages/Dashboard/User/UpdateParcel";


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
                element: <AdminRoute><AllParcel></AllParcel></AdminRoute>
            },
            {
                path: 'allUsers',
                element: <AdminRoute><AllUser></AllUser></AdminRoute>
            },
            {
                path: 'allDeliveryMen',
                element: <AdminRoute><AllDeliveryMan></AllDeliveryMan></AdminRoute>
            },
            {
                path: 'statistics',
                element: <AdminRoute><Statistics></Statistics></AdminRoute>
            },

            // Delivery Man routes
            {
                path: 'deliveryList',
                element: <DeliveryMenRoute><DeliveryList></DeliveryList></DeliveryMenRoute>
            },
            {
                path: 'myReviews',
                element: <DeliveryMenRoute><DeliveryManReviews></DeliveryManReviews></DeliveryMenRoute>
            },

            // User routes
            {
                path: 'userProfile',
                element: <PrivateRoute><UserProfile></UserProfile></PrivateRoute>
            },
            {
                path: 'userParcels',
                element: <UserParcels></UserParcels>
            },
            {
                path: 'bookAParcel',
                element: <BookAParcel></BookAParcel>
            },
            {
                path: 'parcelUpdate/:id',
                element: <UpdateParcel></UpdateParcel>,
                loader: ({ params }) => fetch(`https://parcel-tracker-server-reduanul-haques-projects.vercel.app/parcel/${params.id}`)

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