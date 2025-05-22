import React, { useContext } from "react";
import userContext from "@/context/user.context";

const Profile = () => {
  const { userData } = useContext(userContext);

  if (!userData) {
    return <div>No user data available</div>;
  }

  const {
    fullname,
    email,
    address,
    college,
    city,
    state,
    pincode,
    phone,
  } = userData;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-md shadow-md mt-8">
      <h1 className="text-3xl font-semibold mb-6">User Profile</h1>
      <div className="space-y-4 text-gray-900 dark:text-gray-200 wrap-break-word">
        <p><strong>Full Name:</strong> {fullname.firstname} {fullname.lastname}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Address:</strong> {address}</p>
        <p><strong>College:</strong> {college}</p>
        <p><strong>City:</strong> {city}</p>
        <p><strong>State:</strong> {state}</p>
        <p><strong>Pincode:</strong> {pincode}</p>
        <p><strong>Phone:</strong> {phone}</p>
      </div>
    </div>
  );
};

export default Profile;
