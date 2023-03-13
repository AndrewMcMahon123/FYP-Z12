import {NavBarFixed} from "./Navbar";
import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const CreateProfileComponent = () => {

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
    console.log('WESPONSE', data);
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
      navigate("/dashboard");
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
                    <button type="button" class="btn btn-primary btn-lg" disabled={disabled} onClick={saveProfile}>Save</button>
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

export default CreateProfileComponent;