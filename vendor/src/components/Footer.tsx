

import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-20 items-start shadow-md border-t-2 border-gray-200 bg-white py-10 px-6 md:px-20 lg:px-40 backdrop-blur-lg bg-opacity-30">
      {/* Logo Section */}
      <div className="font-bold text-lg text-center sm:text-left">
        TRAVEL SHOP
      </div>

      {/* Links Section 1 */}
      <div className="flex flex-col gap-4 text-black text-lg text-center sm:text-left">
        <span>sit amet</span>
        <span>ipsum</span>
        <span>ut labore</span>
        <span>consectetur</span>
      </div>

      {/* Links Section 2 */}
      <div className="flex flex-col gap-4 text-black text-lg text-center sm:text-left">
        <span>sit amet</span>
        <span>ipsum</span>
        <span>ut labore</span>
        <span>consectetur</span>
      </div>
    </div>
  );
};

export default Footer;





