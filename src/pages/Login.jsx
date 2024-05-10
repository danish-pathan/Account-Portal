import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
    await firebase.signinUserWithEmailAndPass(email, password);
    console.log("You are logged in");
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
            <h2>Login</h2>
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
              type="password"
              onChange={handlePasswordChange}
              value={password}
            />
          </div>
          <button type="submit" className="signup-btn">
            Login
          </button>
          <div
            style={{ marginTop: "20px" }}
            className="d-flex justify-content-center"
          >
            <button
              onClick={firebase.signinWithGoogle}
              className="btn btn-danger"
            >
              Sign in with Google
            </button>
          </div>
        </form>
        {/* <h3 className="mt-5 mb-5">OR</h3> */}
      </div>
    </div>
  );
};

export default Login;
