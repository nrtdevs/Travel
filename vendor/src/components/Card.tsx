import dots from "../assets/dotss.png";
import personIcon from "../assets/person_icon.png";
import sIcon from "../assets/s_icon.png";
import starIcon from "../assets/star_icon.png";

const features = [
  {
    id: 1,
    icon: starIcon, // Correct way to use image imports
    text: "Lorem",
  },
  {
    id: 2,
    icon: personIcon, // Correct way to use image imports
    text: "Lorem",
  },
  {
    id: 3,
    icon: sIcon, // Correct way to use image imports
    text: "Lorem",
  },
];

const Card = () => {
  return (
    <div className="relative w-full  overflow-hidden">
     
      <img className="absolute inset-0 w-full h-[400px] object-cover" src={dots} alt="background" />

      
      <div className="relative text-center z-10 mt-8">
        <h1 className="text-5xl font-bold text-[#EC1380]">
          Lorem ipsum dolor sit amet
        </h1>
      </div>

     
      <div className="flex flex-wrap justify-center items-center gap-6 px-4 py-16 relative z-10">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="w-60 sm:w-40 md:w-52 lg:w-60 p-6 bg-white shadow-md rounded-xl border border-gray-200 flex flex-col items-center text-center transition transform hover:scale-105 duration-300"
          >
            {/* Feature Icon */}
            <img src={feature.icon} alt="Feature Icon" className="w-16 h-16 mb-4" />

            {/* Feature Text */}
            <p className="text-2xl font-medium">
              {feature.text} <span className="font-bold">ipsum</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
