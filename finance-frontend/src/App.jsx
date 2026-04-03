
import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Records from "./pages/Records";
import Navbar from "./components/Navbar";
import "./styles.css";

function App() {
  const [user, setUser] = useState(null);

  //  DEFAULT TO DASHBOARD AFTER LOGIN
  const [page, setPage] = useState("login");

  //  NOT LOGGED IN
  if (!user) {
    return (
      <>
        {page === "login" && (
          <Login
            setUser={setUser}
            setPage={setPage}   
            goRegister={() => setPage("register")}
          />
        )}

        {page === "register" && (
          <Register goLogin={() => setPage("login")} />
        )}
      </>
    );
  }

  // LOGGED IN UI
  return (
    <>
      <Navbar setPage={setPage} setUser={setUser} />

      {page === "dashboard" && <Dashboard user={user} />}
      {page === "records" && <Records user={user} />}
    </>
  );
}

export default App;