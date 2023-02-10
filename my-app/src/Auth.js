import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavBarFixed } from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";


const LoginComponent = () => {
  localStorage.clear();
  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem("authenticated")
  );
  const [error, setError] = useState(null);


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleInputChange2 = (event) => {
    setInputValue2(event.target.value);
  };

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    // check if input values are empty
    setError(false);
    event.preventDefault();
    const response = await fetch("http://localhost:4000/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: inputValue, password: inputValue2 }),
    });
    const data = await response.json();

    if (data.access_token) {
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("authenticated", true);
      navigate("/dashboard");
    } else {
      setError(true);
    }
  };

  const handleItem = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:4000/users/me/items/", {
      method: "GET",
      headers: { "Content-Type": "application/json", "X-Token": token },
    });

    if (response.status === 200) {
      const data = await response.json();
    }
  };

  return (
  <div>
    <div>
  <NavBarFixed />
  </div>

    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="text"
              className="form-control mt-1"
              value={inputValue}
              placeholder="Enter email"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              value={inputValue2}
              placeholder="Enter password"
              onChange={handleInputChange2}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          {error && (
            <p className="text-danger text-center">
              Incorrect username or password
            </p>
          )}

          <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
    </div>
  );
};

export default LoginComponent;
