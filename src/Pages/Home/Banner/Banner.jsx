import './banner.css'

const Banner = () => {
    return (
        <div className='banner-bg ' >
            <div className="max-w-6xl mx-auto p-2 sm:p-4 md:p-6 lg:p-10 ">
                <div className="grid lg:grid-cols-2 gap-2 sm:gap-4 md:gap-6 lg:gap-10">
                    {/* Text */}
                    <div className=" justify-center items-center space-y-5">
                        <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold">Parcel Management <br />
                            <span className="text-teal-700">Made Easy</span></h1>
                        <h1 className='hidden sm:block'>Log incoming and outgoing packages, send notifications and collect proof-of-collections in seconds with the Parcel Tracker application.
                        </h1>
                        <div className="pt-10 space-y-5">
                            <input className="w-3/4 m-auto border-2 rounded-lg py-2 px-4 border-black" placeholder="Search Your Parcel  . . ." type="search" name="" id="" />
                            <button className="w-3/4 mx-auto btn btn-accent
                        ">Search Now</button>
                        </div>


                    </div>
                    {/* Img */}
                    <div className="" data-aos="flip-left">
                        <img src="https://assets-global.website-files.com/6153505f6048ea0c20a70140/61a02b0ce8de323660035474_Landing%20Page%20Large%20Compressed.png" alt="" />
                    </div>
                </div>
                <div>
                    <div>
                        <p className="text-lg sm:xl md:text-2xl lg:text-2xl text-center">
                            Simplified parcel management for more than  <br /> <strong className="text-red-400">1,000,000</strong> deliveries
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;