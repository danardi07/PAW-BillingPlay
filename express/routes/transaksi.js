const express = require("express");
const router = express.Router();
const db = require("../database/db"); 


router.get("/", (req, res) => {
  const sql = `
    SELECT t.id, t.start_time, t.end_time, t.durasi, t.harga_per_jam, t.subtotal, t.status,
           b.nama_unit
    FROM transaksi t
    JOIN billing_unit b ON t.billing_id = b.id
    ORDER BY t.id DESC
  `;
  db.query(sql, (err, rows) => {
    if (err) {
      console.error("Error GET transaksi:", err);
      return res.status(500).json({ msg: "Gagal mengambil data transaksi" });
    }
    res.json(rows);
  });
});


router.post("/", (req, res) => {
  const { billing_id, start_time, end_time, durasi, harga_per_jam, status, subtotal } = req.body;

  if (!billing_id || !start_time || !end_time || !durasi || !harga_per_jam || !status || !subtotal) {
    return res.status(400).json({ msg: "Semua field wajib diisi" });
  }

  const start = start_time.replace("T", " ") + ":00";
  const end = end_time.replace("T", " ") + ":00";

  const sql = `
    INSERT INTO transaksi
    (billing_id, start_time, end_time, durasi, harga_per_jam, status, subtotal)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [billing_id, start, end, durasi, harga_per_jam, status, subtotal], (err, result) => {
    if (err) {
      console.error("Tambah transaksi error:", err);
      return res.status(500).json({ msg: "Gagal menambahkan transaksi" });
    }
    res.json({ msg: "Transaksi berhasil ditambahkan", id: result.insertId });
  });
});

module.exports = router;
