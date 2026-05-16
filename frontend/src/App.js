import React, { useState } from "react";
import ReportList from "./components/ReportList";
import ReportForm from "./components/ReportForm";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("reports");
  const [editingReport, setEditingReport] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleReportSaved = () => {
    setEditingReport(null);
    setActiveTab("reports");
    setRefreshKey((k) => k + 1);
  };

  const handleEdit = (report) => {
    setEditingReport(report);
    setActiveTab("form");
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">🌿</span>
            <span className="logo-text">EcoReport</span>
          </div>
          <p className="tagline">Community Environmental Issue Tracker</p>
          <nav className="nav">
            <button
              className={`nav-btn ${activeTab === "reports" ? "active" : ""}`}
              onClick={() => { setActiveTab("reports"); setEditingReport(null); }}
            >
              📋 All Reports
            </button>
            <button
              className={`nav-btn ${activeTab === "form" ? "active" : ""}`}
              onClick={() => { setActiveTab("form"); setEditingReport(null); }}
            >
              ➕ Submit Report
            </button>
          </nav>
        </div>
      </header>

      <main className="main">
        {activeTab === "reports" && (
          <ReportList key={refreshKey} onEdit={handleEdit} />
        )}
        {activeTab === "form" && (
          <ReportForm
            editingReport={editingReport}
            onSaved={handleReportSaved}
            onCancel={() => { setActiveTab("reports"); setEditingReport(null); }}
          />
        )}
      </main>

      <footer className="footer">
        <p>🌱 EcoReport — Built for IT2234 Web Services & Technology</p>
      </footer>
    </div>
  );
}

export default App;
