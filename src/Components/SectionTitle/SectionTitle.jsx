
const SectionTitle = ({ heading1, heading2, subHeading }) => {
    return (
        <div className=" text-center mb-10">
            <h3 className="text-5xl  uppercase text-teal-600  font-bold py-4 underline underline-offset-8">{heading1} <span className="text-red-500 underline underline-offset-8"> {heading2}</span> </h3>
            <p className="  font-semibold text-lg
             text-gray-600">{subHeading} </p>
        </div>
    );
};

export default SectionTitle;