import React from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const Navbar = () => {
  const firebase = useFirebase();

  const handleLogout = async () => {
    await firebase.signOut();
  };
  return (
    <container>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Account Portal
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              {!firebase.isLoggedIn && (
                <li className="nav-item">
                  <Link
                    to="/register"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Register
                  </Link>
                </li>
              )}
              {firebase.isLoggedIn && (
                <li className="nav-item">
                  <Link to="/companyreg" className="nav-link text-light">
                    Company Registration
                  </Link>
                </li>
              )}
              {firebase.isLoggedIn && (
                <li className="nav-item">
                  <Link to="/directorreg" className="nav-link text-light">
                    Director Registration
                  </Link>
                </li>
              )}
              {firebase.isLoggedIn && (
                <li className="nav-item">
                  <Link to="/docupload" className="nav-link text-light">
                    Document Upload
                  </Link>
                </li>
              )}
              {firebase.isLoggedIn && (
                <li className="nav-item">
                  <Link to="/viewdocs" className="nav-link text-light">
                    View Documents
                  </Link>
                </li>
              )}
              {firebase.isLoggedIn ? (
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-link text-light"
                  >
                    Logout
                  </button>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    </container>
  );
};

export default Navbar;
