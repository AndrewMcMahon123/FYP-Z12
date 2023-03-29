import {useEffect, useState} from 'react';

export function PersonalBests () {

    const [personalBests, setPersonalBests] = useState([71, 75, 86, 87, 94, 96]);

    useEffect(() => {
    console.log("PersonalBests useEffect");
    async function getPersonalBests() {
    const username = localStorage.getItem("username");
    const response = await fetch('http://localhost:4000/results?user_name='+username+'');
    const data = await response.json();

    const lowestTimeForEachDistance = {};
  // loop through each item in the API response
  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    // if this is the first time we've seen this distance, set the lowest time to this item's time
    if (!lowestTimeForEachDistance[item.distance]) {
      lowestTimeForEachDistance[item.distance] = item.time;
    }
    // otherwise, check if this item's time is lower than the current lowest time for this distance
    else if (item.time < lowestTimeForEachDistance[item.distance]) {
      lowestTimeForEachDistance[item.distance] = item.time;
    }
  }
    setPersonalBests(Object.values(lowestTimeForEachDistance));
    }
    getPersonalBests();
    }, []);

   function secondsToMMSSss(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return '0'+`${minutes}:${secondsLeft}`+'0';
    }

   function secondsToMMSS(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    if(minutes < 10){
    return '0'+`${minutes}:${secondsLeft}`;
    }
    return `${minutes}:${secondsLeft}`;
   }

   // get first item in personalBests array

    return (
    <>
    <h4 class="text-center">Personal Bests</h4>
          <p>
            100m: {secondsToMMSSss(personalBests[0]/5)}   <span class="text-success d-inline">(102%)</span>
          </p>
          <p>
            500m: {secondsToMMSS(personalBests[1])} <span class="text-danger d-inline">(65%)</span>
          </p>
          <p>
            1000m: {secondsToMMSS(personalBests[2]*2)} <span class="text-danger d-inline">(74%)</span>
          </p>
          <p>
            2000m: {secondsToMMSS(personalBests[3]*4)} <span class="text-success d-inline">(118%)</span>
          </p>
          <p>
            6000m: {secondsToMMSS(personalBests[4]*12)} <span class="text-success d-inline">(98%)</span>
          </p>
          <p>
            10000m: {secondsToMMSS(personalBests[5]*20)} <span class="text-danger d-inline">(54%)</span>
          </p>
    </>
    );
}