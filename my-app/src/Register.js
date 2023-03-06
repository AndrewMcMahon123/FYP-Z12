import React, { useState } from "react";
import PasswordChecklist from "react-password-checklist"


const RegistrationComponent = () => {

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [repeatPassword, setRepeatPassword] = useState("");
const [email, setEmail] = useState("");
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

const handleRegister = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
    });
    const data = await response.json();
    console.log(data);

}

const isDisabled = !username || !password || !repeatPassword || !email || !passwordsMatch;

return (
    <section class="vh-100">
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
			        <label class="form-label" for="form3Example4c"></label>
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
                    <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                    <label class="form-check-label" for="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div>

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" class="btn btn-primary btn-lg" onClick={handleRegister}
                    disabled={isDisabled}
                    >Register</button>
                  </div>

                </form>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                    <PasswordChecklist
                    rules={["minLength","specialChar","number","capital","match"]}
                    minLength={5}
                    value={password}
                    valueAgain={repeatPassword}
                    onChange={(isValid) => {}}
                    />
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