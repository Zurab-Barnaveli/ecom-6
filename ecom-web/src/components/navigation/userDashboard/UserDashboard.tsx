import React, { useState, useEffect } from "react";
import { useUserStore } from "../../../zustand/store";

const UserDashboard = () => {
  const [newPassword, setNewPassword] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Not authenticated");
      return;
    }
    try {
      const res = await fetch("http://localhost:8080/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        alert("Failed to fetch user data.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handlePasswordChange = async (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setAvatarFile(event.target.files[0]);
    }
  };

  const handleAvatarUpload = async () => {};

  return (
    <div>
      <h2>User Dashboard</h2>

      <div>
        <h3>Profile Details</h3>
        {user && (
          <ul>
            <li>First Name: {user.firstName}</li>
            <li>Last Name: {user.lastName}</li>
            <li>Phone Number: {user.phoneNumber}</li>
            <li>Email: {user.email}</li>
          </ul>
        )}
      </div>

      {/* Avatar Section */}
      <div>
        <h3>Change Avatar</h3>
        <input type='file' onChange={handleAvatarChange} />
        <button onClick={handleAvatarUpload}>Upload</button>
      </div>

      {/* Password Change Section */}
      <div>
        <h3>Change Password</h3>
        <form onSubmit={handlePasswordChange}>
          <input
            type='password'
            placeholder='New Password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button type='submit'>Change Password</button>
        </form>
      </div>
    </div>
  );
};

export default UserDashboard;
