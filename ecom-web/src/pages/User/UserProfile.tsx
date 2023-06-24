import React, { useState } from "react";

const UserProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Not authenticated");
      return;
    }
    try {
      const res = await fetch("http://localhost:8080/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ firstName, lastName, phoneNumber, email }),
      });
      if (res.ok) {
        alert("Profile updated successfully.");
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error during profile update:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='First Name'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Last Name'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Phone Number'
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type='submit'>Update Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;
