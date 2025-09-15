import React, {useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("kasir");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/auth/register", {
        username,
        email,
        password,
        role,
      });
      alert(res.data.msg);
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data.msg || "Gagal registrasi. Silakan coba lagi.");
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
      <h2>Register BillingPlay</h2>
      <form style={formStyle} onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={inputStyle}
        />

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

        <label>Pilih Role:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={inputStyle}
          required
        >
        
          <option value="admin">Admin</option>
          <option value="kasir">Kasir</option>
        </select>

        <button type="submit" style={buttonStyle}>
          Register
        </button>

        <Link to="/login" style={linkStyle}>
          Sudah punya akun?{" "}
          <span
            style={{ color: "white", transition: "0.3s" }}
            onMouseOver={(e) => (e.target.style.color = "#0a44e4ff")}
            onMouseOut={(e) => (e.target.style.color = "#61dafb")}
          >
            Login di sini
          </span>
        </Link>
      </form>
    </div>
  );
}

export default RegisterPage;
