import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Secure_login.gif";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (username && password) {
        // Simulate login success and redirect to home
        const response = await fetch("http://localhost:5000/auth/otp/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone: username, password }),
        });
        const data = await response.json();
        console.log(data);
        if (data.data.success) {
          navigate("/varification", { state: { phone: username } });
        }
      } else {
        alert("Please fill in both fields.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div style={styles.container}>
      <img src={logo} alt="Logo" style={styles.logo} />
      <div style={styles.content}>
        <h3>Sign in</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Username or email address"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "300px",
    textAlign: "center",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 2px 4px hsla(0, 0.00%, 0.00%, 0.30)",
    position: "absolute", // Ensure the element can be positioned
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)", // Use transform for centering
  },
  logo: {
    width: "250px",
    height: "auto",
  },
  content: {
    margin: "20px",
    marginTop: "0",
    padding: "20px",
    paddingTop: "0",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "6px",
    width: "90%",
    margin: "0 auto",
    fontSize: "13px",
    border: "none",
    outline: "none",
    borderBottom: "1px solid #ccc",
  },
  button: {
    padding: "6px",
    width: "90%",
    margin: "0 auto",
    fontSize: "13px",
    backgroundColor: "#2da44e",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default Login;
