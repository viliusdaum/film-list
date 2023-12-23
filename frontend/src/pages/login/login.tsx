import { useState } from "react";
import style from "./login.module.scss";
import { useNavigate } from "react-router-dom";

const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    setEmailError("");
    setPasswordError("");

    if (!email || !validateEmail(email)) {
      setEmailError("Please enter a valid email.");
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    try {
      const response = await fetch("/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("auth ok");

        onLogin(); // Only call onLogin if the response was ok
      } else {
        console.error("Authentication failed:", data.message);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  return (
    <div className={style.login_container}>
      <h2 className={style.login}>Login</h2>
      <form onSubmit={handleLogin}>
        <div className={style.email}>
          <input
            className={style.email_field}
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p>{emailError}</p>}
        </div>
        <br />
        <div className={style.password}>
          <input
            className={style.password_field}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError && <p>{passwordError}</p>}
        </div>
        <br />
        <button className={style.login_button} type="submit">
          Login
        </button>
      </form>
      <div className={style.signup_container}>
        <div className={style.signup_text}> Don't have an account?</div>
        <button
          className={style.signup_button}
          onClick={() => navigate("/signup")}
        >
          Signup here
        </button>
      </div>
    </div>
  );
};

export default Login;
