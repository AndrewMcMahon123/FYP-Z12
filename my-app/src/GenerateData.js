import {NavBarFixed} from "./Navbar";
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { render } from 'react-dom';
import BasicModal from './Modal';

const GenerateDataComponent = () => {

const [resultsGenerated, setResultsGenerated] = useState(false);
const [downloadedCsvData, setDownloadedCsvData] = useState('');
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const username = localStorage.getItem('username');

const downloadCSV = async () => {
    const response = await fetch('http://localhost:4000/download?user_id="+username+"'
    );
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = localStorage.getItem("username")+'.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    setResultsGenerated(true);
}


  const generateRes = async () => {
//    try {
      const response = await axios.get('http://localhost:4000/download?user_name='+username+'');
      setDownloadedCsvData(response.data);
      setResultsGenerated(true);
//    } catch (error) {
//      console.log('ERROR', error);
//    }
  };

  const generateResults = async () => {
  toast.promise(generateRes(), {
    loading: 'Generating results...',
    success: 'Results generated!',
    error: 'Results already generated for this user.',
    });
    };


    const downloadResults = () => {
    const downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', 'http://localhost:4000/download?user_name='+username+'');
    downloadLink.setAttribute('download', `${localStorage.getItem('username')}.csv`);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };


    let csvData;
//  if (isDownloadReady) {
    csvData = downloadedCsvData;
//  }

const disableButton = !resultsGenerated;



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

                  <BasicModal text={downloadedCsvData} />

                    <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                     <button type="button" class="btn btn-primary btn-block" disabled={disableButton} onClick={downloadResults}>Download Results</button>
                    </div>
                  </div>

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
    };

    export default GenerateDataComponent;