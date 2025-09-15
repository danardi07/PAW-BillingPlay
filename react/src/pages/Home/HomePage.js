import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center",
    background: "linear-gradient(135deg, #1e1e2f, #2a2a40)",
    color: "white",
    fontFamily: "sans-serif",
    padding: "20px",
  };

  const buttonStyle = {
    padding: "12px 24px",
    fontSize: "1.1em",
    marginTop: "15px",
    backgroundColor: "#ff4757",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "0.3s",
    width: "200px",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <h1>🎮 BillingPlay</h1>
      <p>
        Sistem Billing PlayStation
      </p>

      {}
      <Link
        to="/billing-order"
        style={buttonStyle}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#ff6b81")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#ff4757")}
      >
        Start Billing
      </Link>

      {}
      <Link
        to="/ps"
        style={{ ...buttonStyle, backgroundColor: "#ffa502" }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#ffbe76")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#ffa502")}
      >
        Tambah PS
      </Link>

      {}
      <Link
        to="/tv"
        style={{ ...buttonStyle, backgroundColor: "#ff02a2ff" }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#f233acff")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#ff02a2ff")}
      >
        Tambah TV
      </Link>

      <Link
        to="/billing-unit"
        style={{ ...buttonStyle, backgroundColor: "#15e906ff" }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#5af984ff")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#15e906ff")}
      >
        Kelola Billing
      </Link>

      {}
      <Link
        to="/laporan"
        style={{ ...buttonStyle, backgroundColor: "#1e90ff" }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#4aa3ff")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#1e90ff")}
      >
        Laporan
      </Link>

      {}
      
    </div>
  );
};

export default HomePage;
