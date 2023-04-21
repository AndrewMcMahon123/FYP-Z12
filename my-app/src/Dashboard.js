import { useEffect, useState } from "react";
import { Graph, Tabss, Benchmarkk } from "./Dash";
import {MetricComponent} from "./MetricComponent";
import { BenchmarkResultsTable } from "./BenchmarkResultsTable";
import { NavBarSticky } from "./Navbar";
import { Data, Data2 } from "./Data";
import BenchmarkChart from "./BenchmarkChart";
import toast, { Toaster } from 'react-hot-toast';
import {PersonalBests} from "./PersonalBests";
import {SeasonHighs} from "./SeasonHigh";

const Dashboard = () => {

  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.distance),
    datasets: [
      {
        label: "Benchmark Split",
        data: Data.map((data) => data.split),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
        fill: true,
      },
        {
        label: "Split",
        data: Data2.map((data) => data.split),
        backgroundColor: 'blue',
        borderColor: "blue",
        backgroundColor: 'blue',
        borderColor: 'blue',
        borderWidth: 1,
        type: 'scatter'
        }
    ]
  });
console.log("Data", chartData);
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
//    localStorage.setItem("authenticated", "false");
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

  if (token === null || localStorage.getItem("validToken") === "false" || loggedInUser === "false") {
    console.log("token", token);
    console.log("loggedInUser", loggedInUser);
    window.location.href = "/auth";
  }

  const [userInformation, setUserInformation] = useState({});
  useEffect(() => {
    if (token.length > 0 && loggedInUser === "true") {
      async function getUserInformation() {
      const username = localStorage.getItem("username");
        const response = await fetch("http://localhost:4000/user_profile?user_name="+username, {
          method: "GET",
          headers: { "Content-Type": "application/json", "X-Token": token },
        });
        const data = await response.json();
        setUserInformation(data);
      }
      getUserInformation();
    }
  }
    , []);

    function getAgeFromBirthday(birthday) {
      const today = new Date();
      const birthDate = new Date(birthday);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }

    console.log("userInformation", userInformation);

//   if (validToken && loggedInUser === "true") {
  return (
    <div>
      <NavBarSticky />
      <Toaster />
      <div class="col-sm-8">
        <div class="col-sm-3">
          <div class="well">
            <h4 class="text-center">{userInformation.first_name} {userInformation.last_name}</h4>
            <div class="d-flex">
              <img
                src={require("./man.jpg")}
                class="img-thumbnail img-fluid"
                width="70px"
                height="50px"
              />
              <div class="p-2 ">
                <h4>Age: {getAgeFromBirthday(userInformation.date_of_birth)}</h4>
                <h4>Height: {userInformation.height}cm</h4>
                <h4>Weight: {userInformation.weight}kg</h4>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-4">
          <div class="well">
            <h4 class="text-center">Athlete Information</h4>
            <div class="p-0">
              <p>Category: J18</p>
              <p>Club: {userInformation.club}</p>
              <p>Coach: Jimmy</p>
            </div>
          </div>
        </div>

        <div class="col-sm-5">
          <div class="well">
            <div class="text-center">
              <h4>Metrics</h4>
            </div>
            <div>
              <MetricComponent />
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-2">
        <div class="well">
        < PersonalBests />
        </div>
      </div>

      <div class=" col-sm-2">
        <div class="well">
        < SeasonHighs />
        </div>
      </div>

          <Graph />
    </div>
  );
};

export default Dashboard;
