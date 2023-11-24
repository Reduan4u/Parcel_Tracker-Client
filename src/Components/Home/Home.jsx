import Banner from "../../Pages/Banner/Banner";
import Features from "../../Pages/Features/Features";
import Statistics from "../../Pages/Statistics/Statistics";
import TopDeliveryMan from "../../Pages/TopDeliveryMan/TopDeliveryMan";
import { Helmet } from 'react-helmet-async';
{/* <Helmet>
    <title>Parcel Tracker | Home</title>
</Helmet> */}

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Parcel Tracker | Home</title>
            </Helmet>
            <Banner></Banner>
            <Features></Features>
            <Statistics></Statistics>
            <TopDeliveryMan></TopDeliveryMan>
        </div>
    );
};

export default Home;