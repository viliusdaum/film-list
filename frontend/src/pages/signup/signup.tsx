import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./signup.module.scss";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

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
      setEmailError("Please enter a valid email.");
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Password and confirm password do not match");
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
        return <div>success</div>;
        // onLogin(); // Only call onLogin if the response was ok
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
        back to login
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
      <div></div>
    </div>
  );
};

export default Signup;
