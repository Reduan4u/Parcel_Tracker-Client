
const Contact = () => {
    return (
        <div className="w-10/12 m-auto py-10 ">

            <div className="grid grid-cols-1 gap-8 px-8 py-16 mx-auto md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 bg-base-100 rounded-lg ">
                <div className="flex flex-col justify-between">
                    <div className="py-6 md:py-0 md:px-6 flex flex-col justify-center items-center text-">
                        <h1 className="text-4xl font-bold">Contact Us</h1>
                        <p className="pt-2 pb-4">Fill in the form to start a</p>
                        <div className="space-y-4">
                            <p className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                                </svg>
                                <span>271/6, Rajshahi 6000</span>
                            </p>
                            <p className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                                </svg>
                                <span>+880 17737 13834</span>
                            </p>
                            <p className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                </svg>
                                <span>reduanulhaque13@gmail.com</span>
                            </p>
                        </div>
                    </div>
                    <img src="https://cafeu.vercel.app/img/delevery.png" alt="" className="p-6 " />
                </div>
                <form noValidate="" className="space-y-6">
                    <div>
                        <label className="text-sm">Full name</label>
                        <input id="name" type="text" placeholder="Your Name" className="w-full p-3 input input-bordered  rounded " />
                    </div>
                    <div>
                        <label className="text-sm">Email</label>
                        <input id="email" type="email" placeholder="Your Email" className="w-full p-3 rounded input input-bordered " />
                    </div>
                    <div>
                        <label className="text-sm">Message</label>
                        <textarea id="message" rows="3" placeholder="Your Message" className="w-full h-40 p-3 rounded input input-bordered"></textarea>
                    </div>
                    <button type="submit" className="w-full p-3 text-sm font-bold tracki uppercase btn-outline btn rounded btn-info">Send Message</button>
                </form>
            </div>

        </div>
    );
};

export default Contact;