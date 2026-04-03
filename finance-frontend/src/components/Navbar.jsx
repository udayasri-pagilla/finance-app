function Navbar({ setPage, setUser }) {
  return (
    <div className="navbar">
      <h2>Finance App 💰</h2>

      <div>
        <button onClick={() => setPage("dashboard")}>Dashboard</button>
        <button onClick={() => setPage("records")}>Records</button>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            setUser(null);
            setPage("login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;