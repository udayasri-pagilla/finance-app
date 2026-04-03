import { useState } from "react";
import api from "../api/axios";

function Register({ goLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "viewer"
  });

  const register = async () => {
    try {
      await api.post("/users", form);
      alert("Registered successfully");
      goLogin();
    } catch {
      alert("Error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>

        <input placeholder="Name" onChange={(e)=>setForm({...form, name:e.target.value})} />
        <input placeholder="Email" onChange={(e)=>setForm({...form, email:e.target.value})} />
        <input type="password" placeholder="Password" onChange={(e)=>setForm({...form, password:e.target.value})} />

        <select onChange={(e)=>setForm({...form, role:e.target.value})}>
          <option value="viewer">Viewer</option>
          <option value="analyst">Analyst</option>
          <option value="admin">Admin</option>
        </select>

        <button className="btn" onClick={register}>Register</button>

        <p className="switch-text" onClick={goLogin}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

export default Register;