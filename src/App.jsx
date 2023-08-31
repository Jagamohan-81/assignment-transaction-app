import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import TransactionDetail from "./pages/TransactionDetails";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import "./App.css"; // Import the CSS file

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="container">Loading...</div>}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transaction/:id" element={<TransactionDetail />} />
          </Routes>
        </main>
        <Footer />
      </Suspense>
    </Router>
  );
}

export default App;
