
const Statistics = () => {
    return (
        <div>
            <section className="p-6 w-11/12 max-w-7xl mx-auto my-10 bg-teal-500 rounded-lg ">
                <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-3">
                    {/* 1st Statistics */}
                    <div className="flex justify-around p-4 space-x-4 rounded-lg md:space-x-6 bg-base-100 ">
                        <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-teal-300">
                            <img className="h-32 w-32" src="https://assets-global.website-files.com/6153505f6048ea69cba70145/62c2f80558834637cc5b2391_PO%20Extraction.png" alt="" />
                        </div>
                        <div className="flex flex-col justify-center align-middle ">
                            <p className="text-3xl font-semibold leadi">200</p>
                            <p className="capitalize">Parcel Booked</p>
                        </div>
                    </div>
                    {/* 2nd Statistics */}
                    <div className="flex justify-around p-4 space-x-4 rounded-lg md:space-x-6 bg-base-100 ">
                        <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-teal-300">
                            <img className="h-32 w-32" src="https://assets-global.website-files.com/6153505f6048ea69cba70145/62cc74662afd139d085d0b72_Off%20Page%20muilti%20hop-p-500.png" alt="" />
                        </div>
                        <div className="flex flex-col justify-center align-middle ">
                            <p className="text-3xl font-semibold leadi">200</p>
                            <p className="capitalize">Parcel Delivered</p>
                        </div>
                    </div>
                    {/* 3rd Statistics */}
                    <div className="flex justify-around p-4 space-x-4 rounded-lg md:space-x-6 bg-base-100 ">
                        <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-teal-300">
                            <img className="h-32 w-32" src="https://assets-global.website-files.com/6153505f6048ea69cba70145/618864afa8f201cb7e8c89eb_Digital%20Log%20-%20Searchable%20Log.png" alt="" />
                        </div>
                        <div className="flex flex-col justify-center align-middle ">
                            <p className="text-3xl font-semibold leadi">200</p>
                            <p className="capitalize">Active User</p>
                        </div>
                    </div>


                </div>
            </section>
        </div>
    );
};

export default Statistics;