import { useEffect, useState } from "react";
import Example from "./Navi";
import { Graph, KpiCard, Races, Tabss } from "./Dash";
import  { Redirect } from 'react-router-dom'

const Dashboard = () => {

    const loggedInUser = localStorage.getItem("authenticated");
    const token = localStorage.getItem("token");
    const [auth, setAuth] = useState(loggedInUser);
    const [tokenValid, setTokenValid] = useState(false);

    // check if token exists in local storage and then fetch to verify
    useEffect(() => {
  if (token.length > 0) {
    const verifyToken = async (event) => {
      const response = await fetch("http://localhost:4000/verify_user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token }),
      });

      const data = await response.json();
      console.log(data);

        if (data.message === "Invalid access token") {
        setTokenValid(false);
        }
        else {
        setTokenValid(true);
        }
    };
    verifyToken();
  }
}, [token]);

  if (!loggedInUser || !tokenValid) {
  window.location.href = "/auth";

  }

  else {
    return (
  <div>
    <head>
  <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"></link>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
   </head>
             <div class="col-sm-8">
                        <div class="col-sm-3">
                            <div class="well">
                                <h4 class="text-center">John Doe</h4>
                                    <div class="d-flex">
                                        <img src={require("./man.jpg")} class="img-thumbnail" width="45%"/>
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
                                 <p>100m: 00:21 <span class="text-success d-inline">(102%)</span></p>
                                 <p>500m: 01:23 <span class="text-danger d-inline">(65%)</span></p>
                                 <p>1000m: 03:23 <span class="text-danger d-inline">(74%)</span></p>
                                 <p>2000m: 05:53 <span class="text-success d-inline">(118%)</span></p>
                                 <p>5000m: 14:25 <span class="text-success d-inline">(98%)</span></p>
                                 <p>10000m: 27:38 <span class="text-danger d-inline">(54%)</span></p>
                         </div>
                     </div>

                    <div class=" col-sm-2">
                        <div class="well">
                            <h4 class="text-center">Season Highs</h4>
                            <p>100m: 00:21 <span class="text-success d-inline">(102%)</span></p>
                            <p>500m: 01:23 <span class="text-danger d-inline">(65%)</span></p>
                            <p>1000m: 03:23 <span class="text-danger d-inline">(74%)</span></p>
                            <p>2000m: 05:53 <span class="text-success d-inline">(118%)</span></p>
                            <p>5000m: 14:25 <span class="text-success d-inline">(98%)</span></p>
                            <p>10000m: 27:38 <span class="text-danger d-inline">(54%)</span></p>
                        </div>
                    </div>


                <div class="col-sm-8">
                    <div class="well">
                   <Graph />
                   </div>
                </div>
                <div class="col-sm-4">
                    <div class="well">
                        <h3 class="text-center">Latest Results</h3>
                        <Tabss />
                    </div>
                </div>
   </div>
);
  }
  }


export default Dashboard;