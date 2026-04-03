
import { useEffect, useState } from "react";
import api from "../api/axios";

function Dashboard({ user }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await api.get("/summary");
        setData(response.data);
      } catch (err) {
        if (err.response) {
          setError(err.response.data?.message || "Server error");
        } else {
          setError("Cannot connect to server");
        }
      }
    };

    fetchSummary();
  }, []);

  if (!user) return <p>Loading user...</p>;

  if (error) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>{error}</p>;
  }

  if (!data) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;
  }

  // 🔍 Analyst filter
  let filteredCategories = Object.entries(data.categoryBreakdown);

  if (user.role === "analyst") {
    filteredCategories = filteredCategories.filter(([category]) =>
      category.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <div className="page">
      <div className="card">
        <h2>Dashboard Overview ({user.role.toUpperCase()})</h2>

        <p><strong>Total Income:</strong> ₹{data.totalIncome}</p>
        <p><strong>Total Expense:</strong> ₹{data.totalExpense}</p>
        <p><strong>Net Balance:</strong> ₹{data.netBalance}</p>

        {/* 🔍 ANALYST TOOLS */}
        {user.role === "analyst" && (
          <>
            <hr />
            <h3>🔍 Analytics Tools</h3>

            <input
              placeholder="Search category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <p style={{ fontSize: "13px", color: "gray" }}>
              Filter categories by name
            </p>
          </>
        )}

        <hr />

        {/* CATEGORY */}
        <h3>Category Breakdown</h3>

        {filteredCategories.length === 0 ? (
          <p>No matching results</p>
        ) : (
          filteredCategories.map(([k, v]) => (
            <p key={k}>{k}: ₹{v}</p>
          ))
        )}

        {/* 🔥 RECENT ACTIVITY */}
        <hr />
        <h3>Recent Activity</h3>
        {data.recentActivity.map((r) => (
          <p key={r._id}>
            {r.type === "income" ? "🟢" : "🔴"} ₹{r.amount} — {r.category}
          </p>
        ))}

        {/* 🔥 MONTHLY */}
        <hr />
        <h3>Monthly Trends</h3>
        {Object.entries(data.monthlyTrends).map(([k, v]) => (
          <p key={k}>{k}: ₹{v}</p>
        ))}

        {/* 🔥 WEEKLY */}
        <hr />
        <h3>Weekly Trends</h3>
        {Object.entries(data.weeklyTrends).map(([k, v]) => (
          <p key={k}>{k}: ₹{v}</p>
        ))}

        {/* 🔥 ANALYST EXTRA */}
        {user.role === "analyst" && (
          <>
            <hr />
            <p><strong>Total Transactions:</strong> {data.totalTransactions}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;