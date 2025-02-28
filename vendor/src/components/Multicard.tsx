
import React from "react";


const data = [
  { id: "01", text: "Sit Amet" },
  { id: "02", text: "Lorem Ipsum Dolor Sit Amet", bold: "Lorem" },
  {
    id: "03",
    text: "Consectetur Elit, Ut Labore Et Dolore",
    bold: "Adipiscing",
  },
];



const Multicard: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center flex-wrap justify-center md:justify-evenly lg:justify-evenly gap-x-10 gap-y-6 mt-6 mb-4 bg-white px-6 w-full">
      {/* Left Section */}
      <div className="text-center md:text-left">
        <h1 className="sm:text-4xl md:text-5xl lg:text-6xl font-bold">
          Lorem ipsum
        </h1>
        <h1 className="sm:text-4xl md:text-5xl lg:text-6xl font-bold text-pink-600">
          dolor
        </h1>
        <button className="mt-12 md:mt-24 px-6 py-3 bg-pink-600 text-white font-semibold rounded-full">
          sit amet
        </button>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-center md:items-start">
        {/* Small Cards */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
          {data.slice(0, 2).map((item) => (
            <div
              key={item.id}
              className="bg-[#FDECF5] p-6 rounded-lg w-full sm:w-[280px] md:w-[250px] shadow-md text-center md:text-left"
            >
              <h2 className="text-pink-600 font-bold text-3xl">{item.id}</h2>
              <p className="text-2xl sm:text-3xl">
                {item.bold ? (
                  <>
                    <span className="font-bold text-pink-600">{item.bold}</span>{" "}
                    {item.text.replace(item.bold, "")}
                  </>
                ) : (
                  item.text
                )}
              </p>
            </div>
          ))}
        </div>

        {/* Large Card */}
        <div className="bg-pink-100 p-6 rounded-lg w-full sm:w-[380px] md:w-[520px] shadow-md text-center md:text-left">
          <h2 className="text-pink-600 font-bold text-2xl">03</h2>
          <p className="text-2xl sm:text-3xl">
            <span className="font-bold text-pink-600">Adipiscing</span> Elit, Ut
            Labore Et Dolore
          </p>
        </div>
      </div>
    </div>
  );
};

export default Multicard;
