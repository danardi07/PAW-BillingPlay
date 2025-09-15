const express = require("express");
const router = express.Router();
const db = require("../database/db");


router.get("/", (req, res) => {
  const sql = `
    SELECT u.id, u.nama_unit, u.harga_per_jam,
          p.id AS ps_id, p.jenis_ps,
          t.id AS tv_id, t.merk_tv, t.no_tv
    FROM billing_unit u
    JOIN ps p ON u.ps_id = p.id
    JOIN tv t ON u.tv_id = t.id
    ORDER BY u.id DESC
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Get unit error:", err);
      return res.status(500).json({ msg: "Gagal memuat unit" });
    }
    res.json(results);
  });
});


router.post("/", (req, res) => {
  const { nama_unit, ps_id, tv_id, harga_per_jam } = req.body;
  const sql = `INSERT INTO billing_unit (nama_unit, ps_id, tv_id, harga_per_jam) VALUES (?, ?, ?, ?)`;
  db.query(sql, [nama_unit, ps_id, tv_id, harga_per_jam], (err, result) => {
    if (err) return res.status(500).json({ msg: "Gagal menambah unit" });
    res.json({ msg: "Unit berhasil ditambahkan", id: result.insertId });
  });
});

router.put("/:id", (req, res) => {
  const { nama_unit, ps_id, tv_id, harga_per_jam } = req.body;
  const sql = `UPDATE billing_unit SET nama_unit=?, ps_id=?, tv_id=?, harga_per_jam=? WHERE id=?`;
  db.query(sql, [nama_unit, ps_id, tv_id, harga_per_jam, req.params.id], (err) => {
    if (err) return res.status(500).json({ msg: "Gagal mengupdate unit" });
    res.json({ msg: "Unit berhasil diperbarui" });
  });
});


router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM billing_unit WHERE id=?";
  db.query(sql, [req.params.id], (err) => {
    if (err) {
      console.error("Delete unit error:", err);
      return res.status(500).json({ msg: "Gagal menghapus unit" });
    }
    res.json({ msg: "Unit berhasil dihapus" });
  });
});

module.exports = router;
