import React, { useEffect, useState } from "react";
import axios from "axios";

const KelolaPS = () => {
  const [psList, setPsList] = useState([]);
  const [editPS, setEditPS] = useState(null);
  const [form, setForm] = useState({ jenis_ps: "" });


  const fetchPS = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/ps");
      setPsList(res.data || []);
    } catch (err) {
      console.error("Fetch PS error:", err);
      alert("Gagal memuat data PS.");
    }
  };

  useEffect(() => { fetchPS(); }, []);


  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editPS) {
        await axios.put(`http://localhost:3001/api/ps/${editPS.id}`, form);
        alert("Data PS berhasil diperbarui!");
      } else {
        await axios.post("http://localhost:3001/api/ps", form);
        alert("Data PS berhasil ditambahkan!");
      }
      setForm({ jenis_ps: "" });
      setEditPS(null);
      fetchPS();
    } catch (err) {
      console.error("Save PS error:", err);
      alert("Gagal menyimpan data PS.");
    }
  };


  const handleEdit = (ps) => {
    setEditPS(ps);
    setForm({ jenis_ps: ps.jenis_ps });
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus PS ini?")) return;
    try {
      await axios.delete(`http://localhost:3001/api/ps/${id}`);
      alert("Data PS berhasil dihapus!");
      fetchPS();
    } catch (err) {
      console.error("Delete PS error:", err);
      alert("Gagal menghapus PS.");
    }
  };


  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "50px",
    background: "linear-gradient(135deg, #1e1e2f, #2a2a40)",
    color: "white",
    minHeight: "100vh",
    fontFamily: "sans-serif",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#3a3f47",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    width: "350px",
    marginBottom: "30px",
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
    fontSize: "1em",
    marginTop: "10px",
    backgroundColor: "#61dafb",
    color: "#282c34",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const tableStyle = {
    width: "90%",
    borderCollapse: "collapse",
    marginTop: "20px",
    backgroundColor: "#3a3f47",
  };

  const thTdStyle = {
    border: "1px solid #555",
    padding: "10px",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <h2>Kelola PS</h2>

      <form onSubmit={handleSubmit} style={formStyle}>
        <label>Jenis PS:</label>
        <input
          name="jenis_ps"
          value={form.jenis_ps}
          onChange={handleChange}
          placeholder="Contoh: PS4, PS5, ..."
          style={inputStyle}
          required
        />

        <button type="submit" style={buttonStyle}>
          {editPS ? "Update PS" : "Tambah PS"}
        </button>
      </form>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTdStyle}>ID</th>
            <th style={thTdStyle}>Jenis PS</th>
            <th style={thTdStyle}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {psList.length > 0 ? (
            psList.map((ps) => (
              <tr key={ps.id}>
                <td style={thTdStyle}>{ps.id}</td>
                <td style={thTdStyle}>{ps.jenis_ps}</td>
                <td style={thTdStyle}>
                  <button onClick={() => handleEdit(ps)} style={buttonStyle}>
                    Edit
                  </button>{" "}
                  <button
                    onClick={() => handleDelete(ps.id)}
                    style={{ ...buttonStyle, backgroundColor: "#ff4757" }}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center", padding: "15px" }}>
                Tidak ada data PS
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default KelolaPS;
