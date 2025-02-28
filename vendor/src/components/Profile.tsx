import React from "react";
import { gql, useQuery } from "@apollo/client";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface UserProfile {
  id: string;
  username: string;
  org_name: string;
  email: string;
  mobileNo: string;
  createdAt: string;
}

const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      username
      org_name
      email
      mobileNo
      createdAt
    }
  }
`;

const Profile: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ALL_USERS);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-semibold text-center mb-4">User List</h1>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Username</th>
                <th className="border border-gray-300 px-4 py-2">Organization</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
                <th className="border border-gray-300 px-4 py-2">Joined</th>
              </tr>
            </thead>
            <tbody>
              {data?.getAllUsers.map((user: UserProfile, index: number) => (
                <tr key={user.id} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200`}>
                  <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.org_name}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.mobileNo}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(user.createdAt).toDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
