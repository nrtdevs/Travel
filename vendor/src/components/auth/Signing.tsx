
import React, { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Signup from "./Signup";


const SIGN_IN_MUTATION = gql`
  mutation Register($registerData: RegisterUserDto!) {
  register(registerData: $registerData) {
    id
    username
    org_name
    email
    password
    mobileNo
    createdAt
    updatedAt
    createdBy
    deletedAt
  }
}
`;

const Signing: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const navigate = useNavigate();
  const [oneisModalOpen, onesetIsModalOpen] = useState(false);

  

 
  
 

  const [Register, { loading, error }] = useMutation(SIGN_IN_MUTATION, {
    onCompleted: (data) => {
      if (data.register) {
        localStorage.setItem("user", JSON.stringify(data.register));
        alert("Registration successful!"); 
        onClose(); 
        navigate("/"); 
      }
    },
    onError: (error) => {
      console.error("Registration Error:", error.message);
    },
  });
  const [formData, setFormData] = useState({
    username: "",
    org_name: "",
    email: "",
    password: "",
    mobileNo: Number,
  }); 

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle register button click
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Register({
      variables: {
        registerData: {
          username: formData.username,
          org_name: formData.org_name,
          email: formData.email,
          password: formData.password,
          mobileNo: Number(formData.mobileNo),
        },
      },
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-2xl shadow-lg w-[450px] sm:w-[500px] md:w-[600px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-black">Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
              <label className="block font-semibold text-sm text-gray-700">Name of Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter Username name"
                className="mt-1 w-full p-2 border rounded-md text-gray-700"
                required
              />
            </div>

            {/* Organisation Name */}
            <div>
              <label className="block font-semibold text-sm text-gray-700">Name of Organisation</label>
              <input
                type="text"
                name="org_name"
                value={formData.org_name}
                onChange={handleChange}
                placeholder="Enter organisation name"
                className="mt-1 w-full p-2 border rounded-md text-gray-700"
                required
              />
            </div>

            {/* Mobile No */}
            <div>
              <label className="block font-semibold text-sm text-gray-700">Contact Number</label>
              <input
                type="number"
                name="mobileNo"
                value={Number(formData.mobileNo)}
                onChange={handleChange}
                placeholder="Enter mobile number"
                className="mt-1 w-full p-2 border rounded-md text-gray-700"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="mt-4">
            <label className="block font-semibold text-sm text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-1 w-full p-2 border rounded-md text-gray-700"
              required
            />
          </div>

          {/* Password */}
          <div className="mt-4">
            <label className="block font-semibold text-sm text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="mt-1 w-full p-2 border rounded-md text-gray-700"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            
            className="mt-6 w-full bg-pink-600 text-white py-3 rounded-full text-lg font-semibold hover:bg-pink-700 transition"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {/* Error Handling */}
        {error && <p className="text-red-600 mt-2">Error: {error.message}</p>}

  
        
        <Signup oneisOpen={oneisModalOpen} oneonClose={() => onesetIsModalOpen(false)} />
      </div>
    </div>
  );
};

export default Signing;
