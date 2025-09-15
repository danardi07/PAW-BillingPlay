const express = require("express");
const router = express.Router();
const db = require("../database/db");


router.get("/", (req, res) => {
  const sql = "SELECT id, jenis_ps FROM ps ORDER BY id ASC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Get PS error:", err);
      return res.status(500).json({ msg: "Gagal memuat PS" });
    }
    res.json(results);
  });
});


router.post("/", (req, res) => {
  console.log("POST /api/ps body:", req.body); 
  const jenis_ps = req.body.jenis || req.body.jenis_ps;
  if (!jenis_ps) return res.status(400).json({ msg: "jenis_ps wajib diisi" });

  db.query("INSERT INTO ps (jenis_ps) VALUES (?)", [jenis_ps], (err, result) => {
    if (err) return res.status(500).json({ msg: "DB Error", err });
    res.json({ msg: "PS berhasil ditambahkan", ps: { id: result.insertId, jenis_ps } });
  });
});


router.put("/:id", (req, res) => {
  const { jenis_ps } = req.body;
  db.query("UPDATE ps SET jenis_ps=? WHERE id=?", [jenis_ps, req.params.id], (err) => {
    if (err) return res.status(500).json({ msg: "DB Error", err });
    res.json({ msg: "PS berhasil diupdate", ps: { id: req.params.id, jenis_ps } });
  });
});


router.delete("/:id", (req, res) => {
  db.query("DELETE FROM ps WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ msg: "DB Error", err });
    res.json({ msg: "PS berhasil dihapus" });
  });
});

module.exports = router;
