import { createBrowserRouter } from "react-router-dom";
import Root from "../Components/Root/Root";
import ErrorPage from "../Components/Root/ErrorPage/ErrorPage";
import Home from "../Components/Home/Home";
import Dashboard from "../Components/Dashboard/Dashboard";
import AboutUs from "../Components/AboutUs/AboutUs";
import LogIn from "../Components/Authentication/Login";
import SignUp from "../Components/Authentication/SignUp";
import PrivateRoute from "./PrivateRoute";


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
                path: '/dashboard',
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
            },
            {
                path: '/aboutUs',
                element: <AboutUs></AboutUs>,
            },
            {
                path: '/login',
                element: <LogIn></LogIn>,
            },
            {
                path: '/signUp',
                element: <SignUp></SignUp>,
            },
        ]
    },
]);

export default Route;