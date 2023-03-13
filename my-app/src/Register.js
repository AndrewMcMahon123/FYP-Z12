import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordChecklist from "react-password-checklist"
import toast, { Toaster } from 'react-hot-toast';
import {NavBarFixed} from "./Navbar";

const RegistrationComponent = () => {

const navigate = useNavigate();

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [repeatPassword, setRepeatPassword] = useState("");
const [email, setEmail] = useState("");
const [terms, setTerms] = useState(false);
const [passwordsMatch, setPasswordsMatch] = useState(true);

const handleUsernameChange = (event) => {
    setUsername(event.target.value);
}

const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordsMatch(event.target.value === repeatPassword);


}

const handleEmailChange = (event) => {
    setEmail(event.target.value);
}

const handleRepeatPasswordChange = (event) => {
    setRepeatPassword(event.target.value);
    setPasswordsMatch(event.target.value === password);
}

const handleTermsChange = (event) => {
    setTerms(event.target.checked);
}

const handleRegister = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
    });
    const data = await response.json();
    console.log('WESPONSE', data);
    if (data == 'User created successfully') {
        const response = await fetch("http://localhost:4000/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
        });
        const data = await response.json();
        if (data.access_token) {
          localStorage.setItem("token", data.access_token);
          localStorage.setItem("authenticated", true);
          localStorage.setItem("username", username);
          navigate("/createprofile");
        }




    navigate("/createprofile");
    }
    if (data.detail == 'Invalid email format') {
        toast.error('Invalid email format');
    }
    if (data.detail == 'Username already exists') {
        toast.error('Username already exists');
    }
    if (data.detail == 'Email already exists') {
        toast.error('Email already exists');
    }
    if (data.detail == 'Password does not meet requirements') {
        toast.error('Password does not meet requirements');
    }
}

const isDisabled = !username || !password || !repeatPassword || !email || !passwordsMatch || !terms;

return (
    <section class="vh-100">
  <NavBarFixed />
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black">
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form class="mx-1 mx-md-4">

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="text"
                       id="username"
                       class="form-control"
                       placeholder="Username"
                       onChange={handleUsernameChange}
                       />
                      <label class="form-label" for="form3Example1c"></label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="email"
                       id="email"
                       class="form-control"
                       placeholder="Email"
                       onChange={handleEmailChange}
                       />
                      <label class="form-label" for="form3Example3c"></label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="password"
                      id="password"
                      class="form-control"
                      placeholder="Password"
                      onChange={handlePasswordChange}
                      />
                        <PasswordChecklist
                            rules={["minLength", "specialChar", "number", "capital", "match"]}
                            minLength={8}
                            value={password}
                            valueAgain={repeatPassword}
                            />
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="password"
                      id="repeatPassword"
                      class="form-control"
                      placeholder="Repeat Password"
                      onChange={handleRepeatPasswordChange}
                      />
                      {!passwordsMatch && <div className="text-danger">Passwords do not match</div>}
                      <label class="form-label" for="form3Example4cd"></label>
                    </div>
                  </div>

                  <div class="form-check d-flex justify-content-center mb-5">
                    <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" onChange={handleTermsChange}/>
                    <label class="form-check-label" for="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div>

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" class="btn btn-primary btn-lg" onClick={handleRegister}
                    disabled={isDisabled}
                    >Register</button>
                    <Toaster />
                  </div>

                </form>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                  <img src="https://scontent.fdub5-2.fna.fbcdn.net/v/t39.30808-6/310578703_500439622100980_5259821817363940372_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=e3f864&_nc_ohc=LtAkSLq_bDAAX_uj00D&_nc_ht=scontent.fdub5-2.fna&oh=00_AfC6zbYCCcfQUBH1MHoQMSuXR5O30tndg0eyn_srESTc-A&oe=640CA5E3"
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

export default RegistrationComponent;