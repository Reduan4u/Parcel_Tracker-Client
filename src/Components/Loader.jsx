import Lottie from "lottie-react";
import loader from '../../src/assets/loader.json'
const Loader = () => {
    return (
        <div className="w-full flex justify-center items-center min-h-screen">
            <Lottie animationData={loader}> </Lottie>
        </div>
    );
};

export default Loader;