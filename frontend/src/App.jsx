import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import StockForm from "./components/StockForm";
import StockList from "./components/StockList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stocks" element={<StockList />} />
        <Route path="/add-stock" element={<StockForm />} />
        <Route path="/edit-stock/:id" element={<StockForm />} />
      </Routes>
    </Router>
  );
}

export default App;
