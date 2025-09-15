const express = require("express");
const router = express.Router();
const db = require("../database/db");


router.post("/", (req, res) => {
  const { billing_id, unit_id } = req.body;
  db.query(
    "INSERT INTO transaksi (billing_id, unit_id) VALUES (?, ?)",
    [billing_id, unit_id],
    (err, result) => {
      if (err) return res.status(500).json({ msg: "Gagal tambah transaksi" });

      db.query("UPDATE unit SET status='dipakai' WHERE id=?", [unit_id]);

      res.json({ transaksi: { id: result.insertId, billing_id, unit_id, jam_mulai: new Date() } });
    }
  );
});

module.exports = router;
