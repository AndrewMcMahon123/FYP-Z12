import { React } from 'react';
import {NavBarFixed} from "./Navbar";
import z12logo from './z12logo.jpg';

const Home = () => {
  return (
  <div>
    <div>
        <NavBarFixed />
        </div>

<div>
</div>
<div style={{overflow: 'hidden'}}>
<div style={{ backgroundImage: `url(${z12logo})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh'}}>
  <div class="row d-flex justify-content-center align-items-center h-100">
    <div class="col-lg-8 col-xl-11">
      <div class="card" style={{ backgroundColor: 'transparent', border: 'none'}}>
        <div class="card-body p-md-5 text-white">
          <div class="row justify-content-center">
            <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
              <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Welcome to Z12</p>
              <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">The Z12 platform is a tool for the analysis of synthetic data.</p>
              <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Please create a profile to get started.</p>
              <a href="/register" class="btn btn-primary btn-block">Create Profile</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
    </div>
    );
};

export default Home;