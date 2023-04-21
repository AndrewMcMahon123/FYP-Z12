import {NavBarFixed} from "./Navbar";
import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import z12logo from './z12logo.jpg';

const CreateProfileComponent = () => {

  const loggedInUser = localStorage.getItem("authenticated");
  const user_token = localStorage.getItem("token");
  let initialized = false;

const username = localStorage.getItem("username");

useEffect(() => {
    const response = fetch("http://localhost:4000/user_token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: user_token }),
    }
    ).then((response) => response.json())
    .then((data) => {
    if(data.sub.username !== username){
    toast.error("Username does not match the token...\n Redirecting to login page...");
        setTimeout(() => {
        window.location.href = "/auth";
    }, 2000);
    }
    }
    );
    }, [localStorage.getItem("username")]);

  useEffect(() => {
    if (user_token.length > 0 && loggedInUser === "true") {
        async function verifyToken() {
          const response = await fetch("http://localhost:4000/verify_user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: user_token }),
          })
            .then((response) => response.status)
            .then((status) => {
              if (status === 200) {
                console.log("token is valid");
                localStorage.setItem("validToken", "true");
              } else {
                console.log("token is not valid");
                localStorage.setItem("validToken", "false");
              }
            });
        }
        verifyToken();
      }
  }, []);

  if (user_token === null || localStorage.getItem("validToken") === "false" || loggedInUser === "false") {
    console.log("token", user_token);
    console.log("loggedInUser", loggedInUser);
    window.location.href = "/auth";
  }


const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [club, setClub] = useState("");
const [dateOfBirth, setDateOfBirth] = useState("");
const [gender, setGender] = useState("Male");
const [height, setHeight] = useState(0);
const [weight, setWeight] = useState(0);
const [user_id, setUserId] = useState("");
const [success, setSuccess] = useState(false);

const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
}

const handleLastNameChange = (event) => {
    setLastName(event.target.value);
}

const handleClubChange = (event) => {
    setClub(event.target.value);
}

const handleDateOfBirthChange = (event) => {
    setDateOfBirth(event.target.value);
}

const handleHeightChange = (event) => {
    setHeight(event.target.value);
}

const handleWeightChange = (event) => {
    setWeight(event.target.value);
}

const handleGenderChange = (event) => {
    setGender(event.target.value);
}

const disabled = firstName === "" || lastName === "" || club === "" || dateOfBirth === "" || height === 0 || weight === 0;

const [token, setToken] = useState("");

useEffect(() => {
  const token = localStorage.getItem("username");
}, []);


const handleSubmit = async (event) => {
    if(firstName === "" || lastName === "" || club === "" || dateOfBirth === "" || height === 0 || weight === 0){
        toast.error("Please fill out all fields");
        return;
    }
    if(height < 0 || weight < 0){
        toast.error("Height and weight must be greater than 0");
        return;
    }
    if(height > 300 || weight > 300){
        toast.error("Height and weight must be less than 300");
        return;
    }
    if(Date.parse(dateOfBirth) > new Date()){
        toast.error("Date of birth must be in the past");
        return;
    }
    if(Date.parse(dateOfBirth) < new Date(1918, 1, 1)){
        toast.error("Date of birth must be after 1918");
        return;
    }
    const response = await fetch("http://localhost:4000/create_profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({user_id : user_id,
                              first_name : firstName,
                              last_name : lastName,
                              gender : gender,
                              date_of_birth : dateOfBirth,
                              height : height,
                              weight : weight,
                              club : club}),
    });
    const data = await response.json();
    console.log(data);
    if(data === 'User profile created successfully'){
        toast.success("Profile created!");
        setSuccess(true);
        navigate("/generate-data");
    }
    }

const navigate = useNavigate();

async function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}

const saveProfile = async (event) => {
  toast.promise(
    handleSubmit(event),
    {
      loading: 'Creating profile...',
      success: <b>Profile Created!</b>,
      error: <b>Could not save.</b>,
    }
  ).then(() => {
    setTimeout(() => {
      navigate("/generate-data");
    }, 2000);
  }).catch(() => {
    console.log('ERROR');
  });
};




useEffect(() => {
    const username = localStorage.getItem("username");
    if(username){
    fetch("http://localhost:4000/get_user/" + username, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
    .then((response) => response.json())
    .then((data) => {
        setUserId(data.user_id);
    });
    }
}, []);



return (
<section class="vh-100">
    <NavBarFixed />
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black">
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Create Profile</p>

                <form class="mx-1 mx-md-4">

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c" class="form-control" placeholder="First Name" onChange={handleFirstNameChange} />
                      <label class="form-label" for="form3Example1c"></label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                    <input type="text" id="form3Example1c" class="form-control" placeholder="Last Name" onChange={handleLastNameChange}/>
                      <label class="form-label" for="form3Example3c"></label>
                    </div>
                  </div>

                   <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                    <select id="Gender" class="form-control" onChange={handleGenderChange}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    </select>

                      <label class="form-label" for="form3Example3c"></label>
                    </div>
                  </div>


                    <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                        <input
                        type="text"
                        class="form-control"
                        onChange={(e) => console.log(e.target.value)}
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                        placeholder="Date of Birth"
                        onChange={handleDateOfBirthChange}
                        />
                        <label class="form-label" for="form3Example4cd"></label>
                    </div>
                  </div>


                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="number" id="form3Example4c" class="form-control" placeholder="Weight (CM)" onChange={handleWeightChange}/>
                      <label class="form-label" for="form3Example4c"></label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="number" id="form3Example4c" class="form-control" placeholder="Height (KG)" onChange={handleHeightChange}/>
                      <label class="form-label" for="form3Example4c"></label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example4cd" class="form-control" placeholder="Club" onChange={handleClubChange}/>
                      <label class="form-label" for="form3Example4cd"></label>
                    </div>
                  </div>


                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" class="btn btn-primary btn-lg" disabled={disabled} onClick={handleSubmit}>Save</button>
                  </div>

                </form>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src={z12logo} class="img-fluid" alt="Sample image"></img>

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

export default CreateProfileComponent;