import React, { useState, useEffect } from "react";
import axios from "axios";

const BillingUnit = () => {
  const [namaUnit, setNamaUnit] = useState("");
  const [unitList, setUnitList] = useState([]);
  const [psList, setPsList] = useState([]);
  const [tvList, setTvList] = useState([]);
  const [selectedPs, setSelectedPs] = useState("");
  const [selectedTv, setSelectedTv] = useState("");
  const [hargaPerJam, setHargaPerJam] = useState("");
  const [editId, setEditId] = useState(null);


  const fetchUnit = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/billing-unit");
      setUnitList(res.data);
    } catch (err) {
      console.error(err);
      alert("Gagal memuat unit billing.");
    }
  };


  const fetchPs = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/ps");
      setPsList(res.data);
    } catch (err) {
      console.error(err);
      alert("Gagal memuat PS.");
    }
  };


  const fetchTv = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/tv");
      setTvList(res.data);
    } catch (err) {
      console.error(err);
      alert("Gagal memuat TV.");
    }
  };

  useEffect(() => {
    fetchUnit();
    fetchPs();
    fetchTv();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPs || !selectedTv || !hargaPerJam) {
      return alert("Lengkapi semua field");
    }

    const data = {
      nama_unit: namaUnit,
      ps_id: selectedPs,
      tv_id: selectedTv,
      harga_per_jam: hargaPerJam,
    };

    try {
      if (editId) {
        await axios.put(
          `http://localhost:3001/api/billing-unit/${editId}`,
          data
        );
        alert("Unit berhasil diupdate!");
      } else {
        await axios.post("http://localhost:3001/api/billing-unit", data);
        alert("Unit berhasil ditambahkan!");
      }
      setNamaUnit("");
      setSelectedPs("");
      setSelectedTv("");
      setHargaPerJam("");
      setEditId(null);
      fetchUnit();
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.msg || "Gagal menambahkan/update unit.");
    }
  };


  const handleEdit = (u) => {
    setNamaUnit(u.nama_unit);
    setSelectedPs(u.ps_id);
    setSelectedTv(u.tv_id);
    setHargaPerJam(u.harga_per_jam);
    setEditId(u.id);
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus unit ini?")) return;
    try {
      await axios.delete(`http://localhost:3001/api/billing-unit/${id}`);
      alert("Unit berhasil dihapus!");
      fetchUnit();
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.msg || "Gagal menghapus unit.");
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
      <h2>Kelola Billing Unit</h2>

      <form onSubmit={handleSubmit} style={formStyle}>
        <label>Nama Billing:</label>
        <input
          type="text"
          value={namaUnit}
          onChange={(e) => setNamaUnit(e.target.value)}
          style={inputStyle}
          required
        />

        <label>Pilih PS:</label>
        <select
          value={selectedPs}
          onChange={(e) => setSelectedPs(e.target.value)}
          style={inputStyle}
        >
          <option value="">-- Pilih PS --</option>
          {psList.map((ps) => (
            <option key={ps.id} value={ps.id}>
              {ps.jenis_ps}
            </option>
          ))}
        </select>

        <label>Pilih TV:</label>
        <select
          value={selectedTv}
          onChange={(e) => setSelectedTv(e.target.value)}
          style={inputStyle}
        >
          <option value="">-- Pilih TV --</option>
          {tvList.map((tv) => (
            <option key={tv.id} value={tv.id}>
              {tv.merk_tv} (TV{tv.no_tv})
            </option>
          ))}
        </select>

        <label>Harga Per Jam:</label>
        <input
          type="number"
          value={hargaPerJam}
          onChange={(e) => setHargaPerJam(e.target.value)}
          style={inputStyle}
          required
        />

        <button type="submit" style={buttonStyle}>
          {editId ? "Update Unit" : "Tambah Unit"}
        </button>
      </form>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTdStyle}>NAMA BILLING</th>
            <th style={thTdStyle}>PS</th>
            <th style={thTdStyle}>TV</th>
            <th style={thTdStyle}>No TV</th>
            <th style={thTdStyle}>Harga Per Jam</th>
            <th style={thTdStyle}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {unitList.map((u) => (
            <tr key={u.id}>
              <td style={thTdStyle}>{u.nama_unit}</td>
              <td style={thTdStyle}>{u.jenis_ps}</td>
              <td style={thTdStyle}>{u.merk_tv}</td>
              <td style={thTdStyle}>{u.no_tv}</td>
              <td style={thTdStyle}>{u.harga_per_jam}</td>
              <td style={thTdStyle}>
                <button onClick={() => handleEdit(u)} style={buttonStyle}>
                  Edit
                </button>{" "}
                <button
                  onClick={() => handleDelete(u.id)}
                  style={{ ...buttonStyle, backgroundColor: "#ff4757" }}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillingUnit;
