import React, { useState, useEffect } from "react";
import axios from "axios";

const Tambah = () => {
  const [billingList, setBillingList] = useState([]);
  const [transaksiList, setTransaksiList] = useState([]);
  const [selectedBilling, setSelectedBilling] = useState("");
  const [hargaPerJam, setHargaPerJam] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [durasi, setDurasi] = useState(1);
  const [endTime, setEndTime] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [metodePembayaran, setMetodePembayaran] = useState("CASH");
  const status = "Digunakan";
  const [foto, setFoto] = useState(null);




  useEffect(() => {
    axios
      .get("http://localhost:3001/api/billing-unit") 
      .then((res) => setBillingList(res.data))
      .catch((err) => console.error(err));
  }, []);


  const fetchTransaksi = () => {
    axios
      .get("http://localhost:3001/api/transaksi")
      .then((res) => setTransaksiList(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTransaksi();
  }, []);


  useEffect(() => {
    const selected = billingList.find((b) => b.id === parseInt(selectedBilling));
    const currentHarga = selected ? selected.harga_per_jam : 0;
    setHargaPerJam(currentHarga);

    if (startTime && durasi > 0 && currentHarga > 0) {
      const start = new Date(startTime);
      const end = new Date(start.getTime() + durasi * 60 * 60 * 1000);
      setEndTime(end.toISOString().slice(0, 16));
      setSubtotal(durasi * currentHarga);
    } else {
      setEndTime("");
      setSubtotal(0);
    }
  }, [selectedBilling, startTime, durasi, billingList]);


    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!selectedBilling || !startTime || durasi <= 0) {
        return alert("Lengkapi semua field dengan benar.");
      }

      try {
        const formData = new FormData();
        formData.append("billing_id", selectedBilling);
        formData.append("start_time", startTime);
        formData.append("end_time", endTime);
        formData.append("durasi", durasi);
        formData.append("harga_per_jam", hargaPerJam);
        formData.append("status", status);
        formData.append("subtotal", subtotal);
        formData.append("metode_pembayaran", metodePembayaran);
        formData.append("foto", foto);

        const res = await axios.post("http://localhost:3001/api/transaksi", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert(res.data.msg || "Transaksi berhasil ditambahkan!");
        setSelectedBilling("");
        setStartTime("");
        setDurasi(1);
        setEndTime("");
        setSubtotal(0);
        setMetodePembayaran("");
        setFoto(null);
        fetchTransaksi();
      } catch (err) {
        console.error(err.response?.data);
        alert(err.response?.data?.msg || "Gagal menambahkan transaksi.");
      }
    };



  const containerStyle = { display: "flex", flexDirection: "column", alignItems: "center", padding: "50px", background: "linear-gradient(135deg, #1e1e2f, #2a2a40)", color: "white", minHeight: "100vh", fontFamily: "sans-serif" };
  const formStyle = { display: "flex", flexDirection: "column", backgroundColor: "#3a3f47", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.3)", width: "350px" };
  const inputStyle = { padding: "10px", margin: "10px 0", border: "none", borderRadius: "6px", fontSize: "1em" };
  const buttonStyle = { padding: "12px 20px", fontSize: "1.1em", marginTop: "15px", backgroundColor: "#61dafb", color: "#282c34", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" };
  const labelStyle = { marginTop: "10px", fontWeight: "bold" };
  const tableStyle = { width: "90%", marginTop: "30px", borderCollapse: "collapse", backgroundColor: "#3a3f47" };
  const thTdStyle = { border: "1px solid #555", padding: "10px", textAlign: "center" };

  return (
    <div style={containerStyle}>
      <h2>Tambah Transaksi Billing</h2>
      <form style={formStyle} onSubmit={handleSubmit}>
        <label style={labelStyle}>Billing:</label>
        <select value={selectedBilling} onChange={(e) => setSelectedBilling(e.target.value)} style={inputStyle} required>
          <option value="">-- Pilih Billing --</option>
          {billingList.map((b) => (
            <option key={b.id} value={b.id}>
              {b.nama_unit} (Rp {b.harga_per_jam})
            </option>
          ))}
        </select>

        <label style={labelStyle}>Start Time:</label>
        <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} style={inputStyle} required />

        <label style={labelStyle}>Durasi (jam):</label>
        <input type="number" value={durasi} onChange={(e) => setDurasi(parseFloat(e.target.value) || 0)} min="0.5" step="0.5" style={inputStyle} required />

        <label style={labelStyle}>End Time:</label>
        <input type="datetime-local" value={endTime} readOnly style={inputStyle} />

        <label style={labelStyle}>Harga per Jam:</label>
        <input type="number" value={hargaPerJam} readOnly style={inputStyle} />

        <label style={labelStyle}>Status:</label>
        <input type="text" value={status} readOnly style={inputStyle} />

        <label style={labelStyle}>Subtotal:</label>
        <input type="number" value={subtotal} readOnly style={inputStyle} />

        <label style={labelStyle}>Metode Pembayaran:</label>
        <select
          value={metodePembayaran}
          onChange={(e) => setMetodePembayaran(e.target.value)}
          style={inputStyle}
          required
        >
          <option value="QRIS">QRIS</option>
          <option value="CASH">CASH</option>
        </select>

        <label style={labelStyle}>Upload Foto:</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setFoto(e.target.files[0])} 
          style={inputStyle} 
        />

        <button type="submit" style={buttonStyle}>Tambah</button>
      </form>

      {}
<table style={tableStyle}>
  <thead>
    <tr>
      <th style={thTdStyle}>Billing</th>
      <th style={thTdStyle}>Start Time</th>
      <th style={thTdStyle}>End Time</th>
      <th style={thTdStyle}>Durasi (jam)</th>
      <th style={thTdStyle}>Harga per Jam</th>
      <th style={thTdStyle}>Subtotal</th>
      <th style={thTdStyle}>Metode Pembayaran</th>
      <th style={thTdStyle}>Status</th>
      <th style={thTdStyle}>Foto</th> {}
    </tr>
  </thead>
  <tbody>
    {transaksiList.map((t) => (
      <tr key={t.id}>
        <td>{t.nama_unit}</td>
        <td>{new Date(t.start_time).toLocaleString()}</td>
        <td>{new Date(t.end_time).toLocaleString()}</td>
        <td>{t.durasi}</td>
        <td>{t.harga_per_jam}</td>
        <td>{t.subtotal}</td>
        <td>{t.metode_pembayaran}</td>
        <td>{t.status}</td>
        <td>
          {t.foto ? (
            <img
              src={`http://localhost:3001/uploads/${t.foto}`} 
              alt="foto"
              style={{ width: "80px", borderRadius: "6px" }}
            />
          ) : (
            "-"
          )}
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default Tambah;
