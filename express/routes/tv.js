const express = require("express");
const router = express.Router();
const db = require("../database/db"); 


router.get("/", (req, res) => {
  const sql = "SELECT id, merk_tv, no_tv FROM tv ORDER BY id ASC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Get TV error:", err);
      return res.status(500).json({ msg: "Gagal memuat TV" });
    }
    res.json(results);
  });
});




router.post("/", (req, res) => {
  const { merk_tv, no_tv } = req.body;
  if (!merk_tv || !no_tv) {
    return res.status(400).json({ error: "Merk TV dan Nomor TV wajib diisi" });
  }
  db.query(
    "INSERT INTO tv (merk_tv, no_tv) VALUES (?, ?)",
    [merk_tv, no_tv],
    (err, result) => {
      if (err) {
        console.error("Error inserting TV:", err);
        return res.status(500).json({ error: "Gagal menyimpan data TV" });
      }
      res.json({ id: result.insertId, merk_tv, no_tv });
    }
  );
});


router.put("/:id", (req, res) => {
  const { merk_tv, no_tv } = req.body;
  const { id } = req.params;
  db.query(
    "UPDATE tv SET merk_tv = ?, no_tv = ? WHERE id = ?",
    [merk_tv, no_tv, id],
    (err) => {
      if (err) {
        console.error("Error updating TV:", err);
        return res.status(500).json({ error: "Gagal memperbarui TV" });
      }
      res.json({ id, merk_tv, no_tv });
    }
  );
});


router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM tv WHERE id = ?", [id], (err) => {
    if (err) {
      console.error("Error deleting TV:", err);
      return res.status(500).json({ error: "Gagal menghapus TV" });
    }
    res.json({ message: "TV berhasil dihapus" });
  });
});

module.exports = router;
