import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MdNotificationAdd } from "react-icons/md";
import useAuth from "../../../Hooks/useAuth";
import useParcel from "../../../Hooks/useParcel";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [parcel] = useParcel();
    const axiosPublic = useAxiosPublic();

    const { data: usersData = [], refetch } = useQuery({
        queryKey: ['usersData'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        },
        select: (data) => {
            return data.filter(userData => userData.email === user.email)
        },
    });
    const userInfo = usersData[0];

    // console.log(parcel);

    //Theme Setup
    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");
    useEffect(() => {
        localStorage.setItem("theme", theme);
        const localTheme = localStorage.getItem("theme");
        document.querySelector("html").setAttribute("data-theme", localTheme);
    }, [theme])
    const handleToggle = (event) => {
        if (event.target.checked) {
            setTheme("dark")
        } else {
            setTheme("light")
        }
    }

    const handleSignOut = () => {
        logOut()
            .then()
            .catch()
    }

    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
    </>
    return (
        <div className="bg-teal-300 font-semibold">
            <div className="navbar max-w-6xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown ">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-">
                            {links}
                        </ul>
                    </div>
                    <div className="">

                        <img src="https://assets-global.website-files.com/6153505f6048ea0c20a70140/6154a23ce3c6e550c967959e_Logo%20Tiny.svg" className="w-56" alt="" />
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>

                <div className="navbar-end space-x-3">
                    <div>
                        <button className="">
                            <div className="badge py-6 bg-transparent text-2xl rounded-full border-black"><MdNotificationAdd></MdNotificationAdd><span className="text-red-400 font-bold pb-2">{parcel.length}</span></div>
                        </button>
                    </div>
                    {user?.email ? (
                        <div className="dropdown dropdown-end ">
                            <label tabIndex={0} className="cursor-pointer">
                                <div className="avatar">
                                    <div className="w-6 sm:w-8 md:w-10 lg:w-10 h-6 sm:h-8 md:h-10 lg:h-10 rounded-full">
                                        <img src={userInfo?.image} />
                                    </div>
                                </div>
                            </label>
                            <div
                                tabIndex={0}
                                className="dropdown-content z-[11] menu p-2 shadow bg-base-100 rounded-box w-48"
                            >
                                <h1 className="px-4 py-2 font-bold text-right">{userInfo?.name}</h1>
                                <NavLink
                                    to="/dashboard"
                                    className="px-4 py-2 hover:bg-base-300 rounded-lg text-right"
                                >
                                    Dashboard
                                </NavLink>


                                <div
                                    onClick={handleSignOut}
                                    className="cursor-pointer  text-red-500 font-bold px-4 py-2 hover:bg-base-300 rounded-lg text-right"
                                >
                                    Logout
                                </div>
                            </div>
                        </div>
                    ) : (
                        <NavLink
                            to="/logIn"
                            className={({ isActive }) =>
                                isActive ? 'btn btn-error  btn-sm' : 'btn btn-active btn-ghost btn-sm'
                            }
                        >
                            Login
                        </NavLink>
                    )}




                    <div className="">
                        <label className="swap swap-rotate">

                            {/* this hidden checkbox controls the state */}
                            <input type="checkbox"
                                onChange={handleToggle}
                                checked={theme === "light" ? false : true} />
                            {/* sun icon */}
                            <svg className="swap-on fill-current w-6 sm:w-8 md:w-10 lg:w-10 h-6 sm:h-8 md:h-10 lg:h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                            {/* moon icon */}
                            <svg className="swap-off fill-current w-6 sm:w-8 md:w-10 lg:w-10 h-6 sm:h-8 md:h-10 lg:h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

                        </label>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Navbar;