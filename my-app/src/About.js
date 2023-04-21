import react from 'react';
import {NavBarFixed} from './Navbar';
import z12logo from './z12logo.jpg';
import './aboutStyle.css';

export default function About() {
  return (
    <div>
  < NavBarFixed />


<section class= "section1">
  <div class= "container">
    <h1 class= "title">About</h1>
    <div class= "content-wrapper">
      <div class= "img-wrapper">
        <div class= "img">
        <img src={z12logo} alt="z12logo" style={{width: '100%', height: '100%'}}/>
        </div>
      </div>
      <div class="text-wrapper">

      <h4> Z12 Performance is a web application that allows rowers to capture and analyze their data through
          the use of dashboards and visualizations.</h4>

      <br />
        <ul>
            <li>FastAPI</li>
            <li>React JS</li>
            <li>MongoDB</li>
        </ul>
        < hr />
        <ul>
            <li>Usabilty</li>
            <li>Security</li>
            <li>Extensibility</li>
            <li>Scalability</li>
        </ul>
        < hr />
        <ul>
            <li>Real Life Stakeholders</li>
            <li>World Renowned Rowing Coach</li>
        </ul>
        < hr />
      </div>
   </div>
  </div>
</section>
<section class= "section2"></section>
    </div>
  );
}