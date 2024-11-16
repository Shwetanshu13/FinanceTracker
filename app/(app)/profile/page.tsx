"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface UserProfile {
  name: string;
  email: string;
  dob: string;
  gender: string;
  transactionsCount: number;
}

const ProfilePage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userResponse = await axios.get("/api/user/details");

        const transactionsResponse = await axios.get("/api/transactions/count");

        if (userResponse.data.success && transactionsResponse.data.success) {
          const userData = userResponse.data.data;
          const transactionsCount = transactionsResponse.data.data;
          // console.log(userData, transactionsCount);

          setUserProfile({
            name: userData.name,
            email: userData.email,
            dob: userData.dob,
            gender: userData.gender,
            transactionsCount,
          });
        } else {
          setError("Failed to fetch user data");
        }
      } catch {
        // console.error(err);
        setError("An error occurred while fetching profile data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (isLoading) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold text-center mb-6">User Profile</h1>
      {userProfile && (
        <div className="space-y-4">
          <p className="text-lg">
            <strong>Name:</strong> {userProfile.name}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {userProfile.email}
          </p>
          <p className="text-lg">
            <strong>Date of Birth:</strong>{" "}
            {new Date(userProfile.dob).toLocaleDateString()}
          </p>
          <p className="text-lg">
            <strong>Age:</strong> {calculateAge(userProfile.dob)}
          </p>
          <p className="text-lg">
            <strong>Gender:</strong> {userProfile.gender.toUpperCase()}
          </p>
          <p className="text-lg">
            <strong>No. of Transactions:</strong>{" "}
            {userProfile.transactionsCount}
          </p>
        </div>
      )}
    </div>
  );
};

const calculateAge = (dob: string): number => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export default ProfilePage;
