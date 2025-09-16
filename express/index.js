const express = require("express");
const app = express();


app.use(express.json());


app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@billing.play" && password === "admin") {
    return res.status(200).json({ token: "", role: "admin" });
  }

  if (email === "kasir@billing.play" && password === "kasir") {
    return res.status(200).json({ token: "", role: "kasir" });
  }

  return res.status(401).json({ message: "Anda Bukan Admin atau Kasir Billing Play" });
});


module.exports = app;
