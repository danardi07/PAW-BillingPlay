import React, { useEffect, useState } from "react";
import axios from "axios";

const Laporan = () => {
  const [laporan, setLaporan] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:3001/api/transaksi") 
        .then((res) => setLaporan(res.data))
        .catch((err) => {
          console.error(err);
          alert("Gagal mengambil data laporan.");
        });
    };
    fetchData();
  }, []);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "50px",
    fontFamily: "sans-serif",
    background: "linear-gradient(135deg, #1e1e2f, #2a2a40)",
    minHeight: "100vh",
    color: "white",
  };

  const tableStyle = {
    width: "90%",
    borderCollapse: "collapse",
    marginTop: "30px",
    backgroundColor: "#3a3f47",
  };

  const thTdStyle = {
    border: "1px solid #555",
    padding: "10px",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <h2>Laporan Transaksi Billing</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTdStyle}>Billing</th>
            <th style={thTdStyle}>Tanggal</th>
            <th style={thTdStyle}>Durasi (jam)</th>
            <th style={thTdStyle}>Harga per Jam</th>
            <th style={thTdStyle}>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {laporan.length > 0 ? (
            laporan.map((t) => (
              <tr key={t.id}>
                <td>{t.nama_unit}</td>
                <td>{new Date(t.start_time).toLocaleString()}</td>
                <td>{t.durasi}</td>
                <td>{t.harga_per_jam}</td>
                <td>{t.subtotal}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "15px" }}>
                Tidak ada data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Laporan;
