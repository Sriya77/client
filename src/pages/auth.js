import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from ".././firebaseConfig"; // Adjust the path to your config file
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export const Auth = () => {
  return (
    <div style={styles.auth}>
      <Login />
      <Register />
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful!");
      navigate("/");
    } catch (error) {
      alert("Login Failed: " + error.message);
    }
  };

  return (
    <div style={styles.authContainer}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Login</h2>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration Successful! Please login.");
    } catch (error) {
      alert("Registration Failed: " + error.message);
    }
  };

  return (
    <div style={styles.authContainer}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Register</h2>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
};
const styles = {
  auth: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-start",
    gap: "20px",
    padding: "50px",
    background: "linear-gradient(to right, #1f4037, #99f2c8)",
    minHeight: "100vh",
  },
  authContainer: {
    background: "#ffffff",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    padding: "30px",
    width: "100%",
    maxWidth: "400px",
    animation: "fadeIn 0.6s ease-in-out",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  heading: {
    fontSize: "1.8rem",
    fontWeight: "600",
    color: "#1f4037",
    textAlign: "center",
    marginBottom: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  label: {
    fontSize: "1rem",
    color: "#555",
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  inputFocus: {
    borderColor: "#1f4037",
  },
  button: {
    padding: "12px 20px",
    fontSize: "1rem",
    backgroundColor: "#1f4037",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    fontWeight: "bold",
  },
  buttonHover: {
    backgroundColor: "#13b47d",
  },
};
