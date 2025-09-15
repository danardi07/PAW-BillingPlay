import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      "http://localhost:3001/api/auth/login",
      { email, password }
    );

    // Simpan token & user
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    alert("Login berhasil!");

    // Cek role user dan arahkan sesuai role
    const role = response.data.user.role;

    if (role === "admin") {
      navigate("/home"); // ke HomePage
    } else if (role === "kasir") {
      navigate("/home-kasir"); // ke HomePageKasir
    } else {
      navigate("/home"); // default kalau role lain
    }
  } catch (error) {
    console.error("Login gagal:", error.response?.data);
    alert("Login gagal. Periksa kembali email dan password Anda.");
  }
};


  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "left",
    backgroundColor: "#282c34",
    color: "white",
    fontFamily: "sans-serif",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    backgroundColor: "#3a3f47",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  };

  const inputStyle = {
    padding: "10px",
    margin: "10px 0",
    border: "none",
    borderRadius: "6px",
    fontSize: "1em",
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "1.1em",
    marginTop: "15px",
    backgroundColor: "#61dafb",
    color: "#282c34",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  };

  const linkStyle = {
    marginTop: "10px",
    textAlign: "center",
    color: "#f6fcfdff",
    textDecoration: "none",
    fontSize: "0.9em",
  };

  return (
    <div style={containerStyle}>
      <h2>Masuk Ke BillingPlay</h2>
      <form style={formStyle} onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Login
        </button>

        {}
        <Link to="/register" style={linkStyle}>
          Belum punya akun?{" "}
          <span
            style={{ color: "white", transition: "0.3s" }}
            onMouseOver={(e) => (e.target.style.color = "#0a44e4ff")}
            onMouseOut={(e) => (e.target.style.color = "#61dafb")}
          >
            Register di sini
          </span>
        </Link>

      </form>
    </div>
  );
}

export default LoginPage;
