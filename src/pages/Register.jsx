import { useState } from "react";

import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.signupUserWithEmailAndPassword(email, password);
    navigate("/");
  };

  return (
    <div className="split-screen">
      <div className="left">
        <section className="copy">
          <h1>Account Portal - Manage your Business</h1>
        </section>
      </div>
      <div className="right">
        <form onSubmit={handleSubmit}>
          <section className="copy">
            <h2>Sign Up</h2>
            <div className="login-container">
              <p>
                Already have an account?{" "}
                <a href="/login">
                  {" "}
                  <strong>Log In</strong>
                </a>
              </p>
            </div>
          </section>
          <div className="input-container email">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={handleEmailChange}
              value={email}
            />
          </div>
          <div className="input-container password">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              placeholder="Must be at least 6 characters"
              type="password"
              onChange={handlePasswordChange}
              value={password}
            />
            <i className="far fa-eye-slash"></i>
          </div>
          <button className="signup-btn" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
