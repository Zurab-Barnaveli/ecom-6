import React, { useState } from "react";
import "./LogIn.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.AccessToken);
        localStorage.setItem("User", JSON.stringify(data.User));
        // Navigate to a different page or reload
        // (replace this with your desired navigation logic)
      } else {
        // Show an error message
        alert("Login failed. Please check your email and password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className='login-container'>
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
        <button type='submit'>Log In</button>
      </form>
    </div>
  );
};

export default Login;
