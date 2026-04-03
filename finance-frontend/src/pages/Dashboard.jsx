// import { useEffect, useState } from "react";
// import api from "../api/axios";

// function Dashboard() {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     api.get("/summary").then(res => setData(res.data))
//     .then(res => setData(res.data))
//     .catch(err => {
//        console.log("FULL ERROR:", err); 
//       if (err.response) {
//     setError(err.response.data?.message || "Server error");
//   } else {
//     setError("Cannot connect to server"); // 🔥 IMPORTANT
//   }
//   console.log("RESPONSE:", err.response);
//       console.error(err);
//       setError("Access denied or failed to load data");
//     });
//   }, []);
//   if (error) return <p>{error}</p>;
// if (!data) return <p>Loading...</p>;

  

//   return (
//     <div className="page">
//       <div className="card">
//         <h2>Dashboard Overview</h2>
//         <p style={{color: "gray"}}>Track your income & expenses</p>

//         <p><strong>Total Income:</strong> ₹{data.totalIncome}</p>
//         <p><strong>Total Expense:</strong> ₹{data.totalExpense}</p>
//         <p><strong>Net Balance:</strong> ₹{data.netBalance}</p>

//         <hr />

//         <h3>Categories</h3>
//         {Object.entries(data.categoryBreakdown).map(([k, v]) => (
//           <p key={k}>{k}: ₹{v}</p>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

// import { useEffect, useState } from "react";
// import api from "../api/axios";

// function Dashboard() {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchSummary = async () => {
//       try {
//         const response = await api.get("/summary");

//         console.log("SUMMARY DATA:", response); // 🔥 debug

//         setData(response.data);

//       } catch (err) {
//         console.log("ERROR:", err);

//         if (err.response) {
//           setError(err.response.data?.message || "Server error");
//         } else {
//           setError("Cannot connect to server");
//         }
//       }
//     };

//     fetchSummary();
//   }, []);

//   if (error) {
//     return <p style={{ textAlign: "center", marginTop: "50px" }}>{error}</p>;
//   }

//   if (!data) {
//     return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;
//   }

//   return (
//     <div className="page">
//       <div className="card">
//         <h2>Dashboard Overview</h2>

//         <p><strong>Total Income:</strong> ₹{data.totalIncome}</p>
//         <p><strong>Total Expense:</strong> ₹{data.totalExpense}</p>
//         <p><strong>Net Balance:</strong> ₹{data.netBalance}</p>

//         <hr />

//         <h3>Category Breakdown</h3>
//         {Object.entries(data.categoryBreakdown).map(([k, v]) => (
//           <p key={k}>{k}: ₹{v}</p>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;


import { useEffect, useState } from "react";
import api from "../api/axios";

function Dashboard({ user }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // 🔍 Analyst filters
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

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

  // 🔍 FILTER LOGIC (only for analyst)
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

        {/* 🔥 ANALYST FEATURES */}
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
            <p style={{ fontSize: "13px", color: "gray" }}>
  As an analyst, you can explore and filter financial insights.
</p>
          </>
        )}

        <hr />

        <h3>Category Breakdown</h3>

        {filteredCategories.length === 0 ? (
          <p>No matching results</p>
        ) : (
          filteredCategories.map(([k, v]) => (
            <p key={k}>{k}: ₹{v}</p>
          ))
        )}

        {/* 🔥 EXTRA FOR ANALYST */}
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