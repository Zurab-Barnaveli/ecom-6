import React, { useState } from "react";
import "./Register.scss";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        // Registration successful
        // Navigate to the login page or show a success message
        // (replace this with your desired navigation logic)
      } else {
        // Show an error message
        alert("Registration failed. Please check your input.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className='registration-container'>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Register</button>
      </form>
    </div>
  );
};

export default Registration;
