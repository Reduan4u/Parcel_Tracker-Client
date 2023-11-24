import { useEffect, useState } from "react";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import DeliveryManCard from "./DeliveryManCard";

const TopDeliveryMan = () => {
    const [topDeliveryMen, setTopDeliveryMen] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/deliveryMan')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const sortedDeliveryMen = data.sort((a, b) => b.averageRating - a.averageRating);
                const top5DeliveryMan = sortedDeliveryMen.slice(0, 5);
                setTopDeliveryMen(top5DeliveryMan)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [])

    return (
        <div className="my-10">
            <div>
                <SectionTitle heading1={"parcel tracker"}
                    heading2={"top Delivery man"} subHeading={"Every feature you need to manage incoming and outgoing parcels."}>  </SectionTitle>
            </div>
            <div className="grid md:grid-cols-3 gap-10  w-11/12 max-w-7xl mx-auto my-10">
                {
                    topDeliveryMen.map(deliveryMan => <DeliveryManCard
                        key={deliveryMan.id}
                        deliveryMan={deliveryMan}
                    ></DeliveryManCard>)
                }

            </div>

        </div>
    );
};

export default TopDeliveryMan;