
import { useEffect, useState } from "react";
import api from "../api/axios";

function Records({ user }) {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    category: "",
    type: "income",
  });
  const [editingId, setEditingId] = useState(null);

  // 🔍 FILTER STATES
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  // 🔥 FALLBACK IF USER NOT READY
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

  //  FETCH WITH FILTER
  const fetchRecords = () => {
    let query = "";

    if (search) query += `category=${search}&`;
    if (typeFilter) query += `type=${typeFilter}&`;

    api.get(`/records?${query}`).then((res) => setRecords(res.data));
  };

  useEffect(() => {
    fetchRecords();
  }, [search, typeFilter]);

  // ADD
  const add = async () => {
    try {
      await api.post("/records", form);
      setForm({ amount: "", category: "", type: "income" });
      fetchRecords();
    } catch {
      alert("You are not allowed to add records");
    }
  };

  //  UPDATE
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

        {/*  FILTER UI */}
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
        </div>

        {/*  ADMIN ADD FORM */}
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
              placeholder="Category (e.g. food, rent)"
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

            <button className="btn" onClick={add}>
              Add Record
            </button>

            <hr />
          </>
        ) : (
          <div style={{ marginBottom: "15px" }}>
            <p style={{ color: "#555", fontSize: "14px" }}>
              🔒 You have <b>read-only access</b>.
            </p>
            <p style={{ color: "gray", fontSize: "13px" }}>
              Only admins can add, update, or delete records.
            </p>
            <hr />
          </div>
        )}

        <h3>Transactions</h3>

        {records.length === 0 ? (
          <p style={{ color: "gray" }}>No records found.</p>
        ) : (
          records.map((r) => (
            <div key={r._id} className="record-item">
              {/*  EDIT MODE */}
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
                  {r.type === "income" ? "🟢" : "🔴"} ₹{r.amount} — {r.category}

                  {/*  ADMIN ACTIONS */}
                  {user.role === "admin" && (
                    <div style={{ marginTop: "5px" }}>
                      <button
                        onClick={() => {
                          setEditingId(r._id);
                          setForm({
                            amount: r.amount,
                            category: r.category,
                            type: r.type,
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