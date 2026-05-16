import React, { useEffect, useState } from "react";
import axios from "axios";

const CATEGORIES = [
  "Illegal Dumping", "Water Pollution", "Air Pollution",
  "Deforestation", "Noise Pollution", "Soil Contamination", "Other",
];

function ReportList({ onEdit }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("");

  const fetchReports = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filterStatus) params.status = filterStatus;
      if (filterCategory) params.category = filterCategory;
      if (filterSeverity) params.severity = filterSeverity;

      const res = await axios.get("/api/reports", { params });
      setReports(res.data.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch reports. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReports(); }, [filterStatus, filterCategory, filterSeverity]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;
    try {
      await axios.delete(`/api/reports/${id}`);
      setReports((prev) => prev.filter((r) => r._id !== id));
    } catch {
      alert("Failed to delete report.");
    }
  };

  const stats = {
    total: reports.length,
    pending: reports.filter((r) => r.status === "Pending").length,
    resolved: reports.filter((r) => r.status === "Resolved").length,
    critical: reports.filter((r) => r.severity === "Critical").length,
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div>
      <div className="stats-bar">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Reports</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.resolved}</div>
          <div className="stat-label">Resolved</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: "#dc2626" }}>{stats.critical}</div>
          <div className="stat-label">Critical</div>
        </div>
      </div>

      <div className="section-title">Environmental Reports</div>
      <div className="section-subtitle">Browse and manage community-submitted environmental issues</div>

      <div className="filter-bar">
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All Statuses</option>
          {["Pending", "Under Review", "Resolved", "Closed"].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filterSeverity} onChange={(e) => setFilterSeverity(e.target.value)}>
          <option value="">All Severities</option>
          {["Low", "Medium", "High", "Critical"].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button className="btn btn-secondary" onClick={fetchReports} style={{ borderRadius: "50px", padding: "9px 18px", fontSize: "0.88rem" }}>
          🔄 Refresh
        </button>
      </div>

      {error && <div className="error-msg">⚠️ {error}</div>}

      {loading ? (
        <div className="loading">🌿 Loading reports...</div>
      ) : reports.length === 0 ? (
        <div className="empty-state">
          <div className="icon">🌳</div>
          <p>No reports found. Be the first to submit one!</p>
        </div>
      ) : (
        <div className="reports-grid">
          {reports.map((report) => (
            <div key={report._id} className="card">
              <div className="report-card-header">
                <div className="report-title">{report.title}</div>
              </div>
              <div className="report-meta">
                <span>📍 {report.location}</span>
                <span>👤 {report.reportedBy || "Anonymous"}</span>
                <span>🗓 {formatDate(report.createdAt)}</span>
              </div>
              <p className="report-description">{report.description}</p>
              <div className="report-badges">
                <span className={`badge badge-status-${report.status}`}>{report.status}</span>
                <span className={`badge badge-severity-${report.severity}`}>{report.severity}</span>
                <span className="badge" style={{ background: "#f0fdf4", color: "#166534" }}>
                  {report.category}
                </span>
              </div>
              <div className="report-actions">
                <button className="btn btn-edit" onClick={() => onEdit(report)}>✏️ Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(report._id)}>🗑 Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReportList;
