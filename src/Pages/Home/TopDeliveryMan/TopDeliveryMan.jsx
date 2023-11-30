import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import DeliveryManCard from "./DeliveryManCard";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const TopDeliveryMan = () => {
    const axiosPublic = useAxiosPublic();
    const [topDeliveryMen, setTopDeliveryMen] = useState([]);

    useEffect(() => {
        // Fetch data of all delivery men from the users API
        axiosPublic.get('/users')
            .then((response) => {
                const allDeliveryMen = response.data.filter(user => user.role === 'DeliveryMen');

                // Sort delivery men by the number of parcels they delivered (assuming there is a property named 'deliveryCount')
                const sortedDeliveryMen = allDeliveryMen.sort((a, b) => b.deliveryCount - a.deliveryCount);

                // Take the top 5 delivery men
                const top5DeliveryMen = sortedDeliveryMen.slice(0, 5);

                setTopDeliveryMen(top5DeliveryMen);
            })
            .catch((error) => {
                console.error("Error fetching delivery men data:", error);
            });
    }, [axiosPublic]);

    //console.log(topDeliveryMen);

    return (
        <div className="my-10">
            <div>
                <SectionTitle heading1={"parcel tracker"}
                    heading2={"top Delivery man"} subHeading={"Every feature you need to manage incoming and outgoing parcels."}>  </SectionTitle>
            </div>
            <div className="grid md:grid-cols-3 gap-10  w-11/12 max-w-7xl mx-auto my-10 " data-aos="fade-up"
                data-aos-anchor-placement="bottom-bottom">
                {
                    topDeliveryMen.map(deliveryMan => <DeliveryManCard
                        key={deliveryMan._id}
                        deliveryMan={deliveryMan}
                    ></DeliveryManCard>)
                }

            </div>

        </div>
    );
};

export default TopDeliveryMan;