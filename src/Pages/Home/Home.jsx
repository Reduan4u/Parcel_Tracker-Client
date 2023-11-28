import Banner from "./Banner/Banner";
import Features from "./Features/Features";
import State from "./State/State";
import TopDeliveryMan from "./TopDeliveryMan/TopDeliveryMan";
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
            <State></State>
            <TopDeliveryMan></TopDeliveryMan>
        </div>
    );
};

export default Home;