const express = require("express");
const router = express.Router();
const db = require("../database/db");


router.get("/", (req, res) => {
  const sql = `
    SELECT o.id, o.waktu_mulai, o.waktu_selesai, o.durasi, o.biaya, o.metode, o.status,
           u.id AS unit_id, u.harga_per_jam,
           p.jenis_ps, t.merk_tv, t.no_tv
    FROM billing_order o
    JOIN billing_unit u ON o.unit_id = u.id
    JOIN ps p ON u.ps_id = p.id
    JOIN tv t ON u.tv_id = t.id
    ORDER BY o.id DESC
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Get order error:", err);
      return res.status(500).json({ msg: "Gagal memuat order" });
    }
    res.json(results);
  });
});


router.post("/", (req, res) => {
  const { unit_id, metode } = req.body;
  const sql = `
    INSERT INTO billing_order (unit_id, waktu_mulai, status, metode)
    VALUES (?, NOW(), 'berjalan', ?)
  `;
  db.query(sql, [unit_id, metode], (err, result) => {
    if (err) {
      console.error("Tambah order error:", err);
      return res.status(500).json({ msg: "Gagal menambah order" });
    }
    res.json({ msg: "Order berhasil ditambahkan", id: result.insertId });
  });
});

router.put("/:id", (req, res) => {
  const { waktu_selesai, durasi, biaya, status } = req.body;
  const sql = `
    UPDATE billing_order
    SET waktu_selesai=?, durasi=?, biaya=?, status=?
    WHERE id=?
  `;
  db.query(sql, [waktu_selesai, durasi, biaya, status, req.params.id], (err) => {
    if (err) {
      console.error("Update order error:", err);
      return res.status(500).json({ msg: "Gagal mengupdate order" });
    }
    res.json({ msg: "Order berhasil diperbarui" });
  });
});

router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM billing_order WHERE id=?";
  db.query(sql, [req.params.id], (err) => {
    if (err) {
      console.error("Delete order error:", err);
      return res.status(500).json({ msg: "Gagal menghapus order" });
    }
    res.json({ msg: "Order berhasil dihapus" });
  });
});

module.exports = router;
