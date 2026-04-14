import React, { useState } from "react";
import "./Login.css"; // reuse same CSS
import { toast } from "react-toastify";

function Register({ setIsLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    // ✅ Validation
    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Account created successfully 🎉");
        setIsLogin(true);
      } else {
        toast.error(data.message || "Registration failed");
      }

    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h2 className="logo">📚 BookNest</h2>
        <p className="subtitle">Create your account</p>

        <input
          type="text"
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>Register</button>

        <p style={{ marginTop: "15px", fontSize: "14px" }}>
          Already have an account?{" "}
          <span onClick={() => setIsLogin(true)}>
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register;