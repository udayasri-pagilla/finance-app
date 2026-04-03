import { useState } from "react";
import api from "../api/axios";

function Login({ setUser, setPage, goRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const login = async () => {
  try {
    const res = await api.post("/auth/login", { email, password });

    localStorage.setItem("token", res.data.token);

    setUser(res.data.user);

    setPage("dashboard"); //  THIS FIXES BLANK SCREEN

  } catch {
    alert("Invalid credentials");
  }
};
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />

        <button className="btn" onClick={login}>Login</button>

        <p className="switch-text" onClick={goRegister}>
          Don’t have an account? Register
        </p>
      </div>
    </div>
  );
}

export default Login;