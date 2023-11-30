import Lottie from "lottie-react";
import settings from "../../../assets/settings.json";

const Settings = () => {
    return (
        <div>
            <Lottie animationData={settings} loop={true} />
        </div>
    );
};

export default Settings;