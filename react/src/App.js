import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/login/LoginPage"; 
import RegisterPage from "./pages/login/RegisterPage";
import BillingUnit from "./pages/Billing/billingUnit";
import BillingOrder from "./pages/Billing/billingOrder";
import Laporan from "./pages/Billing/laporan";
import Ps from "./pages/Billing/ps";
import Tv from "./pages/Billing/tv";

import "./App.css";

function App() {
return (
 <Router>
      <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/billing-unit" element={<BillingUnit />} />
            <Route path="/billing-order" element={<BillingOrder />} />
            <Route path="/laporan" element={<Laporan />} />
            <Route path="/ps" element={<Ps />} />
            <Route path="/tv" element={<Tv />} />
            
      </Routes>
 </Router>
);
}
export default App;
