import {NavBarFixed} from "./Navbar";
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { render } from 'react-dom';
import BasicModal from './Modal';
import {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import z12logo from './z12logo.jpg';

const GenerateDataComponent = () => {

    const navigate = useNavigate();

  const loggedInUser = localStorage.getItem("authenticated");
  const token = localStorage.getItem("token");
  let initialized = false;

const username = localStorage.getItem("username");

useEffect(() => {
    const response = fetch("http://localhost:4000/user_token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token }),
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
    if (token.length > 0 && loggedInUser === "true") {
        async function verifyToken() {
          const response = await fetch("http://localhost:4000/verify_user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: token }),
          })
            .then((response) => response.status)
            .then((status) => {
              if (status === 200) {
                localStorage.setItem("validToken", "true");
              } else {
                localStorage.setItem("validToken", "false");
              }
            });
        }
        verifyToken();
      }
  }, []);

  if (token === null || localStorage.getItem("validToken") === "false" || loggedInUser === "false") {
    window.location.href = "/auth";
  }

const [resultsGenerated, setResultsGenerated] = useState(false);
const [downloadedCsvData, setDownloadedCsvData] = useState('');
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const downloadCSV = async () => {
  const response = await fetch('http://localhost:4000/download?user_name='+username+'');
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${localStorage.getItem("username")}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
  setResultsGenerated(true);
};

const generateRes = async () => {
  const response = await axios.get('http://localhost:4000/download?user_name='+username+'');
  setDownloadedCsvData(response.data);
  setResultsGenerated(true);
};

const generateResults = async () => {
  toast.promise(generateRes(), {
    loading: 'Generating results...',
    success: 'Results generated!',
    error: 'Results already generated for this user.',
  });
};


const downloadResults = () => {
  const csvData = new Blob([downloadedCsvData], {type: 'text/csv'});
  const csvUrl = URL.createObjectURL(csvData);
  const link = document.createElement('a');
  link.href = csvUrl;
  link.download = `${localStorage.getItem("username")}.csv`;
  link.click();
};

const goToDashboard = () => {
    navigate('/dashboard');
  };


const disableButton = !resultsGenerated;

   function secondsToMMSSss(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return '0'+`${minutes}:${secondsLeft}`+'0';
    }

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

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Generate Synthetic Results</p>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                     <button type="button" class="btn btn-primary btn-block"
                     onClick={generateResults}
                     disabled={resultsGenerated}
                     >Generate Results</button>
                    </div>
                  </div>

                  <BasicModal text={downloadedCsvData} disabled={disableButton} />

                    <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                     <button type="button" class="btn btn-primary btn-block" disabled={disableButton} onClick={downloadResults}>Download Results</button>
                    </div>
                  </div>


                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                     <button type="button" class="btn btn-primary btn-block" hidden={disableButton} onClick={goToDashboard}
                     >Go to Dashboard</button>
                    </div>
                  </div>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                  <img src={z12logo}
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
    };

    export default GenerateDataComponent;