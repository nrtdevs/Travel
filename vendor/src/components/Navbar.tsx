import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import Signing from "./auth/Signing";
import Signup from "./auth/Signup";
import Hero from "./Hero";
import Card from "./Card";
import Multicard from "./Multicard";
import Footer from "./Footer";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [oneisModalOpen, onesetIsModalOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center lg:justify-end md:justify-end  gap-10">
            <h6 className="text-xl  font-bold"> TRAVEL SHOP</h6>
            <h6 className="text-[16px] font-semibold cursor-pointer">Buy</h6>
            <h6 className="text-[16px] font-semibold cursor-pointer">Curate</h6>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search Bar */}
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleSearch}
                className="w-full p-2 pl-10 border text-[16px] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <Search
                className="absolute left-3 top-3 text-gray-500"
                size={20}
              />
            </div>

            {/* Contact & Auth Buttons */}
            <h1 className="text-[16px] font-semibold cursor-pointer">
              Contact Us
            </h1>
            <h1
              onClick={() => setIsModalOpen(true)}
              className="text-[16px] font-semibold cursor-pointer"
            >
              Signing
            </h1>
            <h1
              onClick={() => onesetIsModalOpen(true)}
              className="text-[16px] font-semibold cursor-pointer"
            >
              Signup
            </h1>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-md ">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleSearch}
                className="w-full p-2 pl-10 border text-[16px] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <Search
                className="absolute left-3 top-3 text-gray-500"
                size={20}
              />
            </div>

            {/* Contact & Auth Buttons */}
            <h1 className="text-[16px] font-semibold cursor-pointer">
              Contact Us
            </h1>
            <h1
              onClick={() => setIsModalOpen(true)}
              className="text-[16px] font-semibold cursor-pointer"
            >
              Signing
            </h1>
            <h1
              onClick={() => onesetIsModalOpen(true)}
              className="text-[16px] font-semibold cursor-pointer"
            >
              Signup
            </h1>
          </div>
        )}

        {/* Modals */}
        <Signing isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <Signup
          oneisOpen={oneisModalOpen}
          oneonClose={() => onesetIsModalOpen(false)}
        />
      </nav>
    </>
  );
};

export default Navbar;
