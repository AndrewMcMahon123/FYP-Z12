import { useEffect, useState } from "react";
import { Graph, KpiCard, Tabss, Benchmarkk } from "./Dash";
import { NavBarSticky } from "./Navbar";
import { Data, Data2 } from "./Data";
import BenchmarkChart from "./BenchmarkChart";

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

  // if (validToken && loggedInUser === "true") {
  return (
    <div>
      <NavBarSticky />
      <div class="col-sm-8">
        <div class="col-sm-3">
          <div class="well">
            <h4 class="text-center">John Doe</h4>
            <div class="d-flex">
              <img
                src={require("./man.jpg")}
                class="img-thumbnail img-fluid"
                width="70px"
                height="50px"
              />
              <div class="p-2 ">
                <h4>Age: 25</h4>
                <h4>Height: 5'10"</h4>
                <h4>Weight: 180lbs</h4>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-4">
          <div class="well">
            <h4 class="text-center">Athlete Information</h4>
            <div class="p-0">
              <p>Category: J18</p>
              <p>Club: St. Michaels</p>
              <p>Coach: Jimmy</p>
              <p>Next race: 23/02/2023 | Limerick | 100m</p>
            </div>
          </div>
        </div>

        <div class="col-sm-5">
          <div class="well">
            <h4 class="text-center">Metrics</h4>
            <div>
              <KpiCard />
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-2">
        <div class="well">
          <h4 class="text-center">Personal Bests</h4>
          <p>
            100m: 00:21 <span class="text-success d-inline">(102%)</span>
          </p>
          <p>
            500m: 01:23 <span class="text-danger d-inline">(65%)</span>
          </p>
          <p>
            1000m: 03:23 <span class="text-danger d-inline">(74%)</span>
          </p>
          <p>
            2000m: 05:53 <span class="text-success d-inline">(118%)</span>
          </p>
          <p>
            5000m: 14:25 <span class="text-success d-inline">(98%)</span>
          </p>
          <p>
            10000m: 27:38 <span class="text-danger d-inline">(54%)</span>
          </p>
        </div>
      </div>

      <div class=" col-sm-2">
        <div class="well">
          <h4 class="text-center">Season Highs</h4>
          <p>
            100m: 00:21 <span class="text-success d-inline">(102%)</span>
          </p>
          <p>
            500m: 01:23 <span class="text-danger d-inline">(65%)</span>
          </p>
          <p>
            1000m: 03:23 <span class="text-danger d-inline">(74%)</span>
          </p>
          <p>
            2000m: 05:53 <span class="text-success d-inline">(118%)</span>
          </p>
          <p>
            5000m: 14:25 <span class="text-success d-inline">(98%)</span>
          </p>
          <p>
            10000m: 27:38 <span class="text-danger d-inline">(54%)</span>
          </p>
        </div>
      </div>

      <div class="col-sm-6">
        <div class="well">
          <Graph />
        </div>
      </div>
      <div class="col-sm-6">
        <div class="well">
            <h3 class="text-center">Benchmark results</h3>
            <div>
            < Benchmarkk />
            </div>
            </div>
            </div>

    </div>
  );
};

export default Dashboard;
