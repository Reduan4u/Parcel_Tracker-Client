import { FaStar, FaHome, FaThList, FaUsers, FaPhone } from "react-icons/fa";
import { LuBoxes } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { IoStatsChart } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { FaBoxesPacking } from "react-icons/fa6";
import { MdBorderColor } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { RiLogoutBoxFill } from "react-icons/ri";

import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";
import useDeliveryMen from "../Hooks/useDeliveryMen";

const Dashboard = () => {
    const { user, logOut } = useAuth();
    // console.log(user);
    const [isDeliveryMen] = useDeliveryMen();
    const [isAdmin] = useAdmin();


    const handleSignOut = () => {
        logOut()
            .then()
            .catch()
    }
    return (
        <div>
            <div className="flex w-10/12 m-auto max-w-6xl">
                {/* dashboard side bar */}
                <div className="w-72 min-h-screen bg-teal-400">
                    <ul className="menu">

                        {
                            isAdmin ?
                                <>
                                    <div className="mb-10 font-bold text-xl flex justify-center items-center space-x-2 py-4 underline-offset-8 underline text-black">
                                        <FaHome></FaHome>
                                        <p><span className="text-red-700 underline-offset-8 underline pr-1">Admin</span> Home</p>
                                    </div>
                                    <li>
                                        <NavLink to="/dashboard/allParcels">
                                            <LuBoxes></LuBoxes>
                                            All Parcels</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/allUsers">
                                            <FaUsers></FaUsers>
                                            All Users</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/allDeliveryMen">
                                            <TbTruckDelivery></TbTruckDelivery>
                                            All Delivery Man</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/statistics">
                                            <IoStatsChart></IoStatsChart>
                                            Statistics</NavLink>
                                    </li>
                                </>
                                : isDeliveryMen ?
                                    <>
                                        <div className="mb-10 font-bold text-xl flex justify-center items-center space-x-2 py-4 underline-offset-8 underline text-black">
                                            <FaHome></FaHome>
                                            <p><span className="text-red-700 underline-offset-8 underline pr-1">Delivery Man</span>  Home</p>
                                        </div>
                                        <li>
                                            <NavLink to="/dashboard/deliveryList">
                                                <FaThList></FaThList>
                                                Delivery List</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/dashboard/myReviews">
                                                <FaStar ></FaStar >
                                                My Reviews</NavLink>
                                        </li>
                                    </>
                                    :
                                    <>
                                        <div className="mb-10 font-bold text-xl flex justify-center items-center space-x-2 py-4 underline-offset-8 underline text-black">
                                            <FaHome></FaHome>
                                            <p><span className="text-red-700 underline-offset-8 underline pr-1">{user.displayName}</span>  Home</p>
                                        </div>
                                        <li>
                                            <NavLink to="/dashboard/userProfile">
                                                <ImProfile></ImProfile>
                                                My Profile</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/dashboard/userParcels">
                                                <FaBoxesPacking></FaBoxesPacking>
                                                My Parcels</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/dashboard/bookAParcel">
                                                <MdBorderColor></MdBorderColor>
                                                Book A Parcel</NavLink>
                                        </li>
                                    </>
                        }



                        {/* shared nav links */}
                        <div className="divider"></div>
                        <div className="">
                            <li>
                                <NavLink to="/">
                                    <FaHome></FaHome>
                                    Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact">
                                    <FaPhone ></FaPhone >
                                    Contact</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/settings">
                                    <IoMdSettings ></IoMdSettings >
                                    Settings</NavLink>
                            </li>
                            <li
                                onClick={handleSignOut}
                                className="font-bold mb-5 hover:bg-red-500 rounded-lg"
                            >
                                <NavLink to="/">
                                    <RiLogoutBoxFill></RiLogoutBoxFill>
                                    Logout
                                </NavLink>
                            </li>
                        </div>
                    </ul>
                </div>

                {/* dashboard content */}
                <div className="flex-1 p-8">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;