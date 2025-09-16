require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const expressLayout = require("express-ejs-layouts");
const db = require("./database/db.js");

const authRoutes = require("./routes/auth.js");
const billingOrderRoutes = require("./routes/billingOrder.js");
const billingUnitRoutes = require("./routes/billingUnit.js");
const tambahRoutes = require("./routes/tambah.js");
const transaksiRoutes = require("./routes/transaksi.js");
const psRoutes = require("./routes/ps.js");
const tvRoutes = require("./routes/tv.js");

const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

app.use("/uploads", express.static("uploads"));
app.set("view engine", "ejs");
app.set("layout", "layouts/main-layout");

app.use(cors());
app.use(expressLayout);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use("/api/auth", authRoutes);
app.use("/api/tambah", tambahRoutes);
app.use("/api/transaksi", transaksiRoutes);
app.use("/api/ps", psRoutes);
app.use("/api/tv", tvRoutes);
app.use("/api/billing-order", billingOrderRoutes);
app.use("/api/billing-unit", billingUnitRoutes);


app.get("/", (req, res) => {
  res.render("index", { layout: "layouts/main-layout" });
});


app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});

app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ msg: "Terjadi kesalahan server", error: err.message });
});

app.listen(port, () => {
  console.log(`BillingPlay server running on http://localhost:${port}`);
});
