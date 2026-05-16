import React, { useState, useEffect } from "react";
import axios from "axios";

const CATEGORIES = [
  "Illegal Dumping", "Water Pollution", "Air Pollution",
  "Deforestation", "Noise Pollution", "Soil Contamination", "Other",
];

const INITIAL_FORM = {
  title: "",
  description: "",
  category: "",
  location: "",
  severity: "Medium",
  status: "Pending",
  reportedBy: "",
};

function ReportForm({ editingReport, onSaved, onCancel }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isEdit = !!editingReport;

  useEffect(() => {
    if (editingReport) {
      setForm({
        title: editingReport.title || "",
        description: editingReport.description || "",
        category: editingReport.category || "",
        location: editingReport.location || "",
        severity: editingReport.severity || "Medium",
        status: editingReport.status || "Pending",
        reportedBy: editingReport.reportedBy || "",
      });
    } else {
      setForm(INITIAL_FORM);
    }
  }, [editingReport]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.category || !form.location) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      if (isEdit) {
        await axios.put(`/api/reports/${editingReport._id}`, form);
        setSuccess("✅ Report updated successfully!");
      } else {
        await axios.post("/api/reports", form);
        setSuccess("✅ Report submitted successfully!");
        setForm(INITIAL_FORM);
      }
      setTimeout(() => onSaved(), 1200);
    } catch (err) {
      const msg = err.response?.data?.message;
      setError(Array.isArray(msg) ? msg.join(", ") : msg || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <div className="section-title">{isEdit ? "✏️ Edit Report" : "📝 Submit New Report"}</div>
      <div className="section-subtitle">
        {isEdit ? "Update the details of this environmental issue." : "Help your community by reporting an environmental issue."}
      </div>

      <div className="card">
        {error && <div className="error-msg">⚠️ {error}</div>}
        {success && <div className="success-msg">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Illegal dumping near Bolgoda Lake"
              maxLength={100}
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the environmental issue in detail..."
              maxLength={1000}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <select name="category" value={form.category} onChange={handleChange}>
                <option value="">Select a category</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Location *</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Negombo, Western Province"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Severity</label>
              <select name="severity" value={form.severity} onChange={handleChange}>
                <option value="Low">🟢 Low</option>
                <option value="Medium">🟡 Medium</option>
                <option value="High">🟠 High</option>
                <option value="Critical">🔴 Critical</option>
              </select>
            </div>
            {isEdit && (
              <div className="form-group">
                <label>Status</label>
                <select name="status" value={form.status} onChange={handleChange}>
                  <option value="Pending">Pending</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            )}
            {!isEdit && (
              <div className="form-group">
                <label>Your Name</label>
                <input
                  name="reportedBy"
                  value={form.reportedBy}
                  onChange={handleChange}
                  placeholder="Anonymous"
                />
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "⏳ Saving..." : isEdit ? "💾 Update Report" : "🌿 Submit Report"}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReportForm;
