import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { NavBarFixed } from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import toast, { Toaster } from 'react-hot-toast';

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
      localStorage.setItem("username", inputValue);
      navigate("/dashboard");
    } else {
      setError(true);
    }
  };

async function signIn



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

//  return (
//  <div>
//    <div>
//  <NavBarFixed />
//  </div>
//
//    <div className="Auth-form-container">
//      <form className="Auth-form">
//        <div className="Auth-form-content">
//          <h3 className="Auth-form-title">Sign In</h3>
//          <div className="form-group mt-3">
//            <label>Email address</label>
//            <input
//              type="text"
//              className="form-control mt-1"
//              value={inputValue}
//              placeholder="Enter email"
//              onChange={handleInputChange}
//            />
//          </div>
//          <div className="form-group mt-3">
//            <label>Password</label>
//            <input
//              type="password"
//              className="form-control mt-1"
//              value={inputValue2}
//              placeholder="Enter password"
//              onChange={handleInputChange2}
//            />
//          </div>
//          <div className="d-grid gap-2 mt-3">
//            <button className="btn btn-primary" onClick={handleSubmit}>
//              Submit
//            </button>
//          </div>
//          {error && (
//            <p className="text-danger text-center">
//              Incorrect username or password
//            </p>
//          )}
//
//          <p className="forgot-password text-right mt-2">
//            <a href="/register">Register</a>
//          </p>
//        </div>
//      </form>
//    </div>
//    </div>
//  );
//};

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

                            {error && (
            <p className="text-danger text-center">
              Incorrect username or password
            </p>
          )}

                </form>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                  <img src="https://scontent.fdub5-2.fna.fbcdn.net/v/t39.30808-6/310578703_500439622100980_5259821817363940372_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=e3f864&_nc_ohc=dVX_C_yPP88AX95A6N_&_nc_ht=scontent.fdub5-2.fna&oh=00_AfC2_D-O9Cl8JDUPa-u1hTx0LQPBgKv0699T6JmkZZ8Lvg&oe=64188363"
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
