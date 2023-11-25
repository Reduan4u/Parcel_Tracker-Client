import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const Features = () => {
    return (
        <div className="w-11/12 max-w-6xl mx-auto my-10">
            <div>

                <SectionTitle subHeading={"Every feature you need to manage incoming and outgoing parcels."} heading1={"Parcel Tracker"}
                    heading2={"Feature services"}>  </SectionTitle>

                <div>
                    <img src="https://assets-global.website-files.com/6153505f6048ea0c20a70140/61773499dc718e23fbecdb54_Features.png" alt="" />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-10">

                {/* 1st card */}
                <div className="card bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img src="https://assets-global.website-files.com/6153505f6048ea69cba70145/6188643391f90c14996b90b7_Outbound%20-%20Proof%20of%20dispatch-p-500.png" alt="Shoes" className="rounded-xl" />
                    </figure>
                    <div className="card-body text-start mt-14">
                        <h2 className="card-title">Super Fast Delivery</h2>
                        <p>First-mile pickup, last-mile delivery services for individuals</p>
                    </div>
                </div>
                {/* 2nd card */}

                <div className="card bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img src="https://assets-global.website-files.com/6153505f6048ea69cba70145/6188629d92aafe691920bad7_Kiosk%20-%20Staffless%20Collections.png" alt="Shoes" className="rounded-xl" />
                    </figure>
                    <div className="card-body text-start ">
                        <h2 className="card-title">Bulk Shipment</h2>
                        <p>Specialized solutions for large items and large numbers</p>
                    </div>
                </div>
                {/* 3rd card */}
                <div className="card bg-base-100 shadow-xl ">
                    <figure className="px-10 pt-10">
                        <img src="https://assets-global.website-files.com/6153505f6048ea69cba70145/62c2f80558834637cc5b2391_PO%20Extraction.png" alt="Shoes" className="rounded-xl" />
                    </figure>
                    <div className="card-body text-start mt-14">
                        <h2 className=" card-title text-start">24/7 Support</h2>
                        <p>Tailor made solutions for your unique business needs</p>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Features;