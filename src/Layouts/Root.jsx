import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Root/Navbar/Navbar";
import Footer from "../Components/Root/Footer/Footer";

const Root = () => {
    const location = useLocation();
    const noFooter = location.pathname.includes('logIn') || location.pathname.includes('signUp');

    return (
        <div>

            <Navbar></Navbar>
            <Outlet></Outlet>
            {noFooter || <Footer></Footer>}

        </div>
    );
};

export default Root;