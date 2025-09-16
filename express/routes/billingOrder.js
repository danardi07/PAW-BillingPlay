const express = require("express");
const router = express.Router();
const db = require("../database/db");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


router.get("/", (req, res) => {
  const sql = `
    SELECT o.id, o.waktu_mulai, o.waktu_selesai, o.durasi, o.biaya, o.metode AS metode_pembayaran, o.status,
       u.id AS unit_id, u.harga_per_jam,
       p.jenis_ps, t.merk_tv, t.no_tv
FROM billing_order o
...

  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Get order error:", err);
      return res.status(500).json({ msg: "Gagal memuat order" });
    }
    res.json(results);
  });
});

router.post("/", upload.single("foto"), (req, res) => {
  const { unit_id, metode_pembayaran, durasi } = req.body; 
  const foto = req.file ? req.file.filename : null;

  const sqlUnit = "SELECT harga_per_jam FROM billing_unit WHERE id=?";
  db.query(sqlUnit, [unit_id], (err, results) => {
    if (err) return res.status(500).json({ msg: "Gagal cek unit" });
    if (results.length === 0) return res.status(400).json({ msg: "Unit tidak ditemukan" });

    const harga = results[0].harga_per_jam;
    const biaya = durasi * harga;

    const sql = `
      INSERT INTO billing_order
      (unit_id, waktu_mulai, waktu_selesai, durasi, biaya, metode, status, foto)
      VALUES (?, NOW(), DATE_ADD(NOW(), INTERVAL ? HOUR), ?, ?, ?, 'berjalan', ?)
    `;
    db.query(sql, [unit_id, durasi, durasi, biaya, metode_pembayaran, foto], (err, result) => {
      if (err) return res.status(500).json({ msg: "Gagal menambah order" });
      res.json({ msg: "Order berhasil ditambahkan", id: result.insertId, biaya, foto });
    });
  });
});


router.put("/:id", upload.single("foto"), (req, res) => {
  const { waktu_selesai, durasi, biaya, status, metode_pembayaran } = req.body;
  const foto = req.file ? req.file.filename : null;

  let sql, params;
  if (foto) {
    sql = `
      UPDATE billing_order
      SET waktu_selesai=?, durasi=?, biaya=?, status=?, foto=?, metode=?
      WHERE id=?
    `;
    params = [waktu_selesai, durasi, biaya, status, foto, metode_pembayaran, req.params.id];
  } else {
    sql = `
      UPDATE billing_order
      SET waktu_selesai=?, durasi=?, biaya=?, status=?, metode=?
      WHERE id=?
    `;
    params = [waktu_selesai, durasi, biaya, status, metode_pembayaran, req.params.id];
  }

  db.query(sql, params, (err) => {
    if (err) return res.status(500).json({ msg: "Gagal mengupdate order" });
    res.json({ msg: "Order berhasil diperbarui", foto });
  });
});

module.exports = router;