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

const [benchmarkTimes, setBenchmarkTimes] = useState([
{category: 'Jr 70kg Men', level: 'Elite1', distance: 100, time: 78},
{category: 'Jr 70kg Men', level: 'Elite1', distance: 500, time: 84},
{category: 'Jr 70kg Men', level: 'Elite1', distance: 1000, time: 90},
{category: 'Jr 70kg Men', level: 'Elite1', distance: 2000, time: 93},
{category: 'Jr 70kg Men', level: 'Elite1', distance: 6000, time: 99},
{category: 'Jr 70kg Men', level: 'Elite1', distance: 10000, time: 102}]);

    useEffect(() => {
    async function getBenchmarkTimes() {

    const levels = ['Elite1', 'Elite2', 'Elite3', 'Elite4', 'PreElite1', 'PreElite2', 'PreElite3', 'PreElite4',
    'Development1', 'Development2', 'Development3', 'Development4'];

    const response = await fetch('http://localhost:4000/benchmarkTimes/Jr70KgMen/Elite1');
    const data = await response.json();

    setBenchmarkTimes(Object.values(data));
    console.log('benchmarkTimes', benchmarkTimes)
    }
    getBenchmarkTimes();
    }, []);

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
    console.log(secondsLeft);
    if(secondsLeft < 10 && minutes < 10){
    return '0'+`${minutes}:`+'0'+`${secondsLeft}`;
    }
    if(minutes < 10){
    return '0'+`${minutes}:${secondsLeft}`;
    }
    if(secondsLeft < 10){
    return `${minutes}:`+'0'+`${secondsLeft}`;
    }
    return `${minutes}:${secondsLeft}`;
   }


return (
    <>
      <h4 class="text-center">Season Highs</h4>
      <p> 1000m: {secondsToMMSS(seasonHighResults[0].time*20)} <span className={Math.floor((benchmarkTimes[0].time/seasonHighResults[0].time)*100) < 100 ? 'text-danger d-inline' : 'text-success d-inline' }> ({Math.floor((benchmarkTimes[0].time/seasonHighResults[0].time)*100)}%) </span>
      </p>
      <p> 500m: {secondsToMMSS(seasonHighResults[1].time*20)} <span className={Math.floor((benchmarkTimes[1].time/seasonHighResults[1].time)*100) < 100 ? 'text-danger d-inline' : 'text-success d-inline' }> ({Math.floor((benchmarkTimes[1].time/seasonHighResults[1].time)*100)}%) </span>
      </p>
      <p> 1000m: {secondsToMMSS(seasonHighResults[2].time*20)} <span className={Math.floor((benchmarkTimes[2].time/seasonHighResults[2].time)*100) < 100 ? 'text-danger d-inline' : 'text-success d-inline' }> ({Math.floor((benchmarkTimes[2].time/seasonHighResults[2].time)*100)}%) </span>
      </p>
      <p> 2000m: {secondsToMMSS(seasonHighResults[3].time*20)} <span className={Math.floor((benchmarkTimes[3].time/seasonHighResults[3].time)*100) < 100 ? 'text-danger d-inline' : 'text-success d-inline' }> ({Math.floor((benchmarkTimes[3].time/seasonHighResults[3].time)*100)}%) </span>
      </p>
      <p> 6000m: {secondsToMMSS(seasonHighResults[4].time*20)} <span className={Math.floor((benchmarkTimes[4].time/seasonHighResults[4].time)*100) < 100 ? 'text-danger d-inline' : 'text-success d-inline' }> ({Math.floor((benchmarkTimes[4].time/seasonHighResults[4].time)*100)}%) </span>
      </p>
      <p> 10000m: {secondsToMMSS(seasonHighResults[5].time*20)} <span className={Math.floor((benchmarkTimes[5].time/seasonHighResults[5].time)*100) < 100 ? 'text-danger d-inline' : 'text-success d-inline' }> ({Math.floor((benchmarkTimes[5].time/seasonHighResults[5].time)*100)}%) </span>
      </p>
    </>
    );
}