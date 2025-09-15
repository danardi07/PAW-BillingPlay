const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../database/db"); 
const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ msg: "Please enter all fields" });

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query("INSERT INTO admin SET ?", { email, password: hashedPassword }, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ msg: "Admin registered successfully" });
  });
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ msg: "Please enter all fields" });

  db.query("SELECT * FROM admin WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    const admin = results[0];
    if (!admin) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: admin.id_admin }, "your_super_secret_jwt_key", { expiresIn: 3600 });
    res.json({ token, admin: { id_admin: admin.id_admin, email: admin.email } });
  });
});

module.exports = router;
