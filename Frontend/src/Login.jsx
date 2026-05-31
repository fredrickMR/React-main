import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function AuthLogin(e) {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("token",  data.token)
      localStorage.setItem("roles", JSON.stringify(data.roles))

      const token = localStorage.getItem("token");
      const roles = JSON.parse(localStorage.getItem("roles"));

      switch(true)
      {
          case roles.includes("Service"):
              navigate("/service")
              break;
          case roles.include("Mekaniker"):
              navigate("/mekaniker")
              break;
          case roles.include("Admin"):
              navigate("/admin")
              break;
          default:
              navigate("/")
              break;
      };
    } else {
      alert("Login failed");
    }
  }

  return (
    <div>
      <form onSubmit={AuthLogin}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;