import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { NavBarFixed } from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import toast, { Toaster } from 'react-hot-toast';
import z12logo from './z12logo.jpg';

const LoginComponent = () => {
  localStorage.clear();
  console.log("LoginComponent");
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
    if (inputValue === "" || inputValue2 === "") {
    toast.error("Please fill in all fields");
    return;
    }
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
      localStorage.setItem("username", inputValue);
      localStorage.setItem('benchmarkActiveTab', 0);
        toast.success("Signing in...");
        setTimeout(() => {
      navigate("/dashboard");
        }, 2000);
      return true;
    } else {
      setError(true);
      toast.error("Username or password is incorrect");
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
    <section class="vh-100">
  <NavBarFixed />
  <Toaster />
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black">
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign in</p>

                <form class="mx-1 mx-md-4">

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="text"
                       id="username"
                       class="form-control"
                       placeholder="Username"
                       value={inputValue}
                       onChange={handleInputChange}
                       />
                      <label class="form-label" for="form3Example1c"></label>
                    </div>
                  </div>


                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="password"
                      id="password"
                      class="form-control"
                      placeholder="Password"
                      value={inputValue2}
                      onChange={handleInputChange2}
                      />
                    </div>
                  </div>

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" class="btn btn-primary btn-lg" onClick={handleSubmit}
                    >Sign in</button>
                  </div>
                            <p className="forgot-password text-right mt-2">
            <a href="/register">Register</a>
          </p>

                </form>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                  <img src={z12logo} style={{width: "100%", height: "100%"}}
                  class="img-fluid" alt="Sample image"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
);
}

export default LoginComponent;
