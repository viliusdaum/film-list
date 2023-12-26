import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./signup.module.scss";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();

    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (!email || !validateEmail(email)) {
      setMessage("Invalid email");
      return;
    }

    if (!password) {
      setMessage("Password is required");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
      return confirmPasswordError;
    }

    try {
      const response = await fetch("/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("auth ok");
        setMessage("Sign Up Successful");
      } else {
        console.error("Authentication failed:", data.message);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };
  return (
    <div className={style.container}>
      <button className={style.back_button} onClick={() => navigate("/")}>
        &#8592; back to login
      </button>
      <form className={style.form} onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {emailError && <p>{emailError}</p>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {passwordError && <p>{passwordError}</p>}
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className={style.submit_button} type="submit">
          Sign Up
        </button>
      </form>
      <div className={style.error_box}>{message}</div>
    </div>
  );
};

export default Signup;
