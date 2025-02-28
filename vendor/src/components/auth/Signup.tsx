
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  oneisOpen: boolean;
  oneonClose: () => void;
}

const SIGN_UP_MUTATION = gql`
  mutation Login($input: LoginUserDto!) {
    login(input: $input) {
      accessToken
      username
    }
  }
`;

const Signup: React.FC<ModalProps> = ({ oneisOpen, oneonClose }) => {
  if (!oneisOpen) return null;
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profile");
    }
  }, [navigate]);

  // Mutation Hook
  const [login, { loading, error }] = useMutation(SIGN_UP_MUTATION, {
    onCompleted: (data) => {
      if (data.login) {
        localStorage.setItem("token", data.login.accessToken);
        localStorage.setItem("user", JSON.stringify(data.login));
        navigate("/profile");
      }
    },
    onError: (error) => {
      console.error("Login Error:", error.message);
    },
  });

  // State for user input
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle login submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      variables: {
        input: {
          username: formData.username,
          password: formData.password,
        },
      },
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={oneonClose} // Click outside modal to close
    >
      <div
        className="bg-white p-6 rounded-2xl shadow-lg w-[450px] sm:w-[500px] md:w-[600px] relative"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        {/* Close Button */}
        <button
          onClick={oneonClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-black">Login</h2>
        <p className="text-gray-600 text-sm mb-6">Enter your credentials to continue</p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            {/* Username */}
            <div>
              <label className="block font-semibold text-sm text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="mt-1 w-full p-2 border rounded-md text-gray-700"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block font-semibold text-sm text-gray-700">
                Password
              </label>
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
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm mt-2">
              {error.message || "Login failed. Please try again."}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full bg-pink-600 text-white py-3 rounded-full text-lg font-semibold hover:bg-pink-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
