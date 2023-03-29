import {useEffect, useState} from 'react';

export function SeasonHighs(){


const [seasonHighResults, setSeasonHighResults] = useState([
{_id: '6418cfbc6d0fe1373669df68', user_id: '88cd1b95-8736-4efb-91f9-7b1f8ba59e75', date: '2022-12-03', distance: '100m', time: 71},
{_id: '6418cfbc6d0fe1373669df74', user_id: '88cd1b95-8736-4efb-91f9-7b1f8ba59e75', date: '2022-06-23', distance: '500m', time: 77},
{_id: '6418cfbc6d0fe1373669df7c', user_id: '88cd1b95-8736-4efb-91f9-7b1f8ba59e75', date: '2022-04-28', distance: '1000m', time: 88},
{_id: '6418cfbd6d0fe1373669df86', user_id: '88cd1b95-8736-4efb-91f9-7b1f8ba59e75', date: '2022-10-30', distance: '2000m', time: 103},
{_id: '6418cfbd6d0fe1373669df90', user_id: '88cd1b95-8736-4efb-91f9-7b1f8ba59e75', date: '2022-02-13', distance: '6000m', time: 98},
{_id: '6418cfbd6d0fe1373669df9c', user_id: '88cd1b95-8736-4efb-91f9-7b1f8ba59e75', date: '2022-06-26', distance: '10000m', time: 104},
]);
const username = localStorage.getItem("username");

useEffect(() => {
     async function getSeasonHighs() {
     const response = await fetch('http://localhost:4000/results?user_name=' + username);
     const data = await response.json();
     // get a random result from each distance
        const randomResultForEachDistance = {};
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            if (!randomResultForEachDistance[item.distance]) {
                randomResultForEachDistance[item.distance] = item;
            }
        }
        setSeasonHighResults(Object.values(randomResultForEachDistance));
     }
        getSeasonHighs();
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


return (
    <>
        <h4 class="text-center">Season Highs</h4>
          <p>
            100m: {secondsToMMSSss(seasonHighResults[0].time/5)} <span class="text-success d-inline">(102%)</span>
          </p>
          <p>
            500m: {secondsToMMSS(seasonHighResults[1].time)} <span class="text-danger d-inline">(65%)</span>
          </p>
          <p>
            1000m: {secondsToMMSS(seasonHighResults[1].time*2)} <span class="text-danger d-inline">(74%)</span>
          </p>
          <p>
            2000m: {secondsToMMSS(seasonHighResults[1].time*4)} <span class="text-success d-inline">(118%)</span>
          </p>
          <p>
            5000m: {secondsToMMSS(seasonHighResults[1].time*12)} <span class="text-success d-inline">(98%)</span>
          </p>
          <p>
            10000m: {secondsToMMSS(seasonHighResults[1].time*20)} <span class="text-danger d-inline">(54%)</span>
          </p>
    </>
    );
}