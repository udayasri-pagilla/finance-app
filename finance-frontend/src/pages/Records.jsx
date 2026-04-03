
import { useEffect, useState } from "react";
import api from "../api/axios";

function Records({ user }) {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    category: "",
    type: "income",
    date: "",
    notes: "",
  });
  const [editingId, setEditingId] = useState(null);

  // 🔍 FILTER STATES
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  if (!user) {
    return (
      <div className="page">
        <div className="card">
          <h2>Records</h2>
          <p style={{ textAlign: "center", color: "gray" }}>
            Loading user information...
          </p>
        </div>
      </div>
    );
  }

  // 🔥 FETCH WITH FILTER (UPDATED)
  const fetchRecords = () => {
    let query = "";

    if (search) query += `category=${search}&`;
    if (typeFilter) query += `type=${typeFilter}&`;

    // ✅ DATE FILTER ADDED
    if (startDate && endDate) {
      query += `startDate=${startDate}&endDate=${endDate}&`;
    }

    api.get(`/records?${query}`).then((res) => setRecords(res.data));
  };

  useEffect(() => {
    fetchRecords();
  }, [search, typeFilter, startDate, endDate]);

  // ADD
  const add = async () => {
    try {
      await api.post("/records", form);
      setForm({
        amount: "",
        category: "",
        type: "income",
        date: "",
        notes: "",
      });
      fetchRecords();
    } catch {
      alert("You are not allowed to add records");
    }
  };

  // UPDATE
  const updateRecord = async (id) => {
    try {
      await api.put(`/records/${id}`, form);
      setEditingId(null);
      fetchRecords();
    } catch {
      alert("Update failed");
    }
  };

  // DELETE
  const deleteRecord = async (id) => {
    if (!window.confirm("Delete this record?")) return;

    try {
      await api.delete(`/records/${id}`);
      fetchRecords();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Records</h2>

        {/* 🔍 FILTER UI */}
        <div style={{ marginBottom: "15px" }}>
          <h3>Filter Records</h3>

          <input
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {/* ✅ DATE FILTER UI */}
          <div style={{ marginTop: "10px" }}>
            <label>From: </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <label style={{ marginLeft: "10px" }}>To: </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        {/* ADMIN FORM */}
        {user.role === "admin" ? (
          <>
            <h3>Add Record</h3>

            <input
              placeholder="Amount"
              value={form.amount}
              onChange={(e) =>
                setForm({ ...form, amount: e.target.value })
              }
            />

            <input
              placeholder="Category (food, rent...)"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            />

            <select
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value })
              }
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
            />

            <input
              placeholder="Notes / Description"
              value={form.notes}
              onChange={(e) =>
                setForm({ ...form, notes: e.target.value })
              }
            />

            <button className="btn" onClick={add}>
              Add Record
            </button>

            <hr />
          </>
        ) : (
          <p>🔒 Read-only access</p>
        )}

        <h3>Transactions</h3>

        {records.length === 0 ? (
          <p style={{ color: "gray" }}>No records found.</p>
        ) : (
          records.map((r) => (
            <div key={r._id} className="record-item">
              {editingId === r._id ? (
                <>
                  <input
                    value={form.amount}
                    onChange={(e) =>
                      setForm({ ...form, amount: e.target.value })
                    }
                  />

                  <input
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                  />

                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) =>
                      setForm({ ...form, date: e.target.value })
                    }
                  />

                  <input
                    value={form.notes}
                    onChange={(e) =>
                      setForm({ ...form, notes: e.target.value })
                    }
                  />

                  <select
                    value={form.type}
                    onChange={(e) =>
                      setForm({ ...form, type: e.target.value })
                    }
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>

                  <button onClick={() => updateRecord(r._id)}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <div>
                    {r.type === "income" ? "🟢" : "🔴"} ₹{r.amount} — {r.category}
                  </div>

                  <div>
                    📅 {r.date ? new Date(r.date).toLocaleDateString() : "No date"}
                  </div>

                  <div>
                    📝 {r.notes || "No notes"}
                  </div>

                  {user.role === "admin" && (
                    <div style={{ marginTop: "5px" }}>
                      <button
                        onClick={() => {
                          setEditingId(r._id);
                          setForm({
                            amount: r.amount,
                            category: r.category,
                            type: r.type,
                            date: r.date ? r.date.split("T")[0] : "",
                            notes: r.notes || "",
                          });
                        }}
                      >
                        ✏️ Edit
                      </button>

                      <button onClick={() => deleteRecord(r._id)}>
                        🗑 Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Records;