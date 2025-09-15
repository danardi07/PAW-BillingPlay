import React, { useEffect, useState } from "react";
import axios from "axios";

const KelolaTV = () => {
  const [tvList, setTvList] = useState([]);
  const [editTV, setEditTV] = useState(null);
  const [form, setForm] = useState({ merk_tv: "", no_tv: "" });


  const fetchTV = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/tv");
      setTvList(res.data || []);
    } catch (err) {
      console.error("Fetch TV error:", err);
      alert("Gagal memuat data TV.");
    }
  };

  useEffect(() => { fetchTV(); }, []);


  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editTV) {
        await axios.put(`http://localhost:3001/api/tv/${editTV.id}`, form);
        alert("Data TV berhasil diperbarui!");
      } else {
        await axios.post("http://localhost:3001/api/tv", form);
        alert("Data TV berhasil ditambahkan!");
      }
      setForm({ merk_tv: "", no_tv: "" });
      setEditTV(null);
      fetchTV();
    } catch (err) {
      console.error("Save TV error:", err);
      alert("Gagal menyimpan data TV.");
    }
  };


  const handleEdit = (tv) => {
    setEditTV(tv);
    setForm({ merk_tv: tv.merk_tv, no_tv: tv.no_tv });
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus TV ini?")) return;
    try {
      await axios.delete(`http://localhost:3001/api/tv/${id}`);
      alert("Data TV berhasil dihapus!");
      fetchTV();
    } catch (err) {
      console.error("Delete TV error:", err);
      alert("Gagal menghapus TV.");
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
      <h2>Kelola TV</h2>

      <form onSubmit={handleSubmit} style={formStyle}>
        <label>Merk TV:</label>
        <input
          name="merk_tv"
          value={form.merk_tv}
          onChange={handleChange}
          placeholder="Contoh: LG, Samsung, Sony..."
          style={inputStyle}
          required
        />

        <label>Nomor TV:</label>
        <input
          name="no_tv"
          value={form.no_tv}
          onChange={handleChange}
          placeholder="Contoh: TV1, TV2, ..."
          style={inputStyle}
          required
        />

        <button type="submit" style={buttonStyle}>
          {editTV ? "Update TV" : "Tambah TV"}
        </button>
      </form>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTdStyle}>ID</th>
            <th style={thTdStyle}>Merk TV</th>
            <th style={thTdStyle}>Nomor TV</th>
            <th style={thTdStyle}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {tvList.length > 0 ? (
            tvList.map((tv) => (
              <tr key={tv.id}>
                <td style={thTdStyle}>{tv.id}</td>
                <td style={thTdStyle}>{tv.merk_tv}</td>
                <td style={thTdStyle}>{tv.no_tv}</td>
                <td style={thTdStyle}>
                  <button onClick={() => handleEdit(tv)} style={buttonStyle}>
                    Edit
                  </button>{" "}
                  <button
                    onClick={() => handleDelete(tv.id)}
                    style={{ ...buttonStyle, backgroundColor: "#ff4757" }}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "15px" }}>
                Tidak ada data TV
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default KelolaTV;
