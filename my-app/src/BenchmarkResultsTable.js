import {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
//import { useLocalStorage } from 'usehooks-ts'
import { useSyncExternalStore } from "react";
import { useLocalStorage } from './useLocalStorage.js';

export function BenchmarkResultsTable( {benchmarkActiveTab}){

    const [personalBests, setPersonalBests] = useState([]);
//    const [activeTab, setActiveTab] = useState(0);
//      const [activeTab, setActiveTab] = useLocalStorage("benchmarkActiveTab", 0);



    useEffect(() => {
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
    }, [benchmarkActiveTab]);

    const [categoryFormed, setCategoryFormed] = useState('Jr70KgMen');
    useEffect(() => {
    async function getBenchmarkTimes() {
    const category = localStorage.getItem("category");

    const levels = ['Elite1', 'Elite2', 'Elite3', 'Elite4', 'PreElite1', 'PreElite2', 'PreElite3', 'PreElite4',
    'Development1', 'Development2', 'Development3', 'Development4'];
    if (category !== null) {
        await setCategoryFormed(category);
//    }
//    if (localStorage.getItem('activeTab') !== null) {
//        await setActiveTab(localStorage.getItem('benchmarkActiveTab'));
//    }
    const response = await fetch('http://localhost:4000/benchmarkTimes/'+categoryFormed+'/'+levels[benchmarkActiveTab]+'');
    const data = await response.json();
    console.log("CHECKTHIS", data);
    }
    getBenchmarkTimes();
    }
    }, [benchmarkActiveTab]);

   function secondsToMMSS(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes}:${secondsLeft}`;
   }



    return (
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Distance</th>
          <th>Rate</th>
          <th>Time</th>
          <th>Split</th>
          <th>Benchmark Score</th>
          <th>Benchmark Split</th>
          <th>%</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>100</td>
          <td>x</td>
          <td>{secondsToMMSS(personalBests[0])}</td>
          <td>@mdo</td>
          <td>00:34</td>
            <td>00:399</td>
            <td>87%</td>
        </tr>
        <tr>
          <td>500</td>
          <td>x</td>
          <td>{secondsToMMSS(personalBests[1])}</td>
          <td>@mdo</td>
          <td>00:34</td>
            <td>00:34</td>
            <td>87%</td>
        </tr>
        <tr>
          <td>1000</td>
          <td>x</td>
          <td>{secondsToMMSS(personalBests[2])}</td>
          <td>@mdo</td>
          <td>00:34</td>
            <td>00:34</td>
            <td>87%</td>
        </tr>
        <tr>
          <td>2000</td>
          <td>x</td>
          <td>{secondsToMMSS(personalBests[3])}</td>
          <td>@mdo</td>
          <td>00:34</td>
            <td>00:34</td>
            <td>87%</td>
        </tr>
        <tr>
          <td>6000</td>
          <td>x</td>
          <td>{secondsToMMSS(personalBests[4])}</td>
          <td>@mdo</td>
          <td>00:34</td>
            <td>00:34</td>
            <td>87%</td>
        </tr>
        <tr>
          <td>10000</td>
          <td>x</td>
          <td>{secondsToMMSS(personalBests[5])}</td>
          <td>@mdo</td>
          <td>00:34</td>
            <td>00:34</td>
            <td>87%</td>
        </tr>
      </tbody>
    </Table>
    );
}