import logo from "../../public/video.mp4";

const Hero = () => {
  return (
    <div>
      <div className="relative w-full h-[300px] md:h-[450px] lg:h-[500px] overflow-hidden">
        <video
          className="absolute inset-0 w-full h-[600px] md:h[550px] lg:h-[500px] object-cover"
          src={logo}
          autoPlay
          loop
          muted
          playsInline
        ></video>

        <div className="absolute inset-0 before:absolute before:inset-0 before:bg-black before:opacity-50"></div>

        
        
        <div className="absolute inset-0  md:w-1/2 lg:w-1/2 h-60 lg:left-10 lg:top-20  md:left-10 md:top-20 text-white py-20">
          <p className="text-10px  md:text-2xl lg:text-3xl font-semibold ">
           Lorem ipsum dolor, sit amet consectetur add the
          </p>
          <p className="text-10  md:text-2xl lg:text-3xl font-semibold mb-2 ">work Dignissimos, ipsum officia odio</p>

          <p className="text-10 md:text-2xl lg:text-2xl  ">
           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos, ipsum officia odio sit amet consectetur adipisicing elit.
          </p>
          <button className="mt-4 sm:text-10  px-6 py-2 text-lg bg-[#EC1380] text-white font-semibold rounded-full  transition duration-300">
           Start Curating
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
