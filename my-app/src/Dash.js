

import Select from 'react-select';
import axios from 'axios';

import * as moment from 'moment';
import 'moment-duration-format';

import {
    UserGroupIcon,
    UserIcon,
} from '@heroicons/react/solid';

import Table from 'react-bootstrap/Table';

import ResultsGraph from "./ResultsGraph";


import { useState, useEffect, useLayoutEffect } from 'react';

import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";


import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {BenchmarkResultsTable} from "./BenchmarkResultsTable";

import { LineChart, PieChart } from 'react-chartkick'
import 'chartkick/chart.js'
import { Data, Data2, Data3, Data4, Data5, Data6, Data7 } from "./Data"
import { Elite1, Elite2, Elite3, Elite4, PreElite1, PreElite2, PreElite3, PreElite4,
 Development1, Development2, Development3, Development4 } from "./BenchmarkResults"

import BenchmarkChart from "./BenchmarkChart";


function formatSecondsToMinutesAndSeconds(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}


export function Graph(){

const ageOptions = [
    { value: 'U14', label: 'U14' },
    { value: 'U16', label: 'U16' },
    { value: 'Junior', label: 'Junior' },
    { value: 'U23', label: 'U23' },
    { value: 'Senior', label: 'Senior' }
];

const genderOptions = [
    { value: 'Male', label: 'Male' },
    {value: 'Female', label: 'Female'}
];

const weightOptions = [
    { value: '70Kg', label: '70Kg' },
    { value: '80Kg', label: '80Kg' },
    { value: 'Heavyweight', label: 'Heavyweight' },
];


    const [setGender, setGenderOption] = useState(null);
//    const [setGender, setGenderOption] = useState(genderOptions[0].value);
    const [setAge, setAgeOption] = useState('U23');
//    const [setAge, setAgeOption] = useState(ageOptions[0].value);
    const [setWeight, setWeightOption] = useState(null);
//    const [setWeight, setWeightOption] = useState(weightOptions[0].value);
        const [benchmarkActiveTab, setBenchmarkActiveTab] = useState(0);


    const benchmarkSets = [Elite1, Elite2, Elite3, Elite4, PreElite1, PreElite2, PreElite3, PreElite4,
    Development1, Development2, Development3, Development4];
    const activeDataSet = benchmarkSets[benchmarkActiveTab];
    const levels = ['Elite1', 'Elite2', 'Elite3', 'Elite4', 'PreElite1', 'PreElite2', 'PreElite3', 'PreElite4',
    'Development1', 'Development2', 'Development3', 'Development4'];
    const activeLevel = levels[benchmarkActiveTab];

const [gr, setGr] = useState([]);

const username = localStorage.getItem('username');

async function getInitialBenchmarkData() {
  const response = await fetch('http://localhost:4000/benchmarkTimes/Jr70KgMen/'+levels[benchmarkActiveTab])
  const data = await response.json()
  setGr(data);
}



useEffect(() => {
  getInitialBenchmarkData();
}, [benchmarkActiveTab]);

    const [categoryFormed, setCategoryFormed] = useState('Jr70KgMen');

    useEffect(() => {
    async function submit() {
    const category = "Jr 70Kg Men";
    const level = "Development1";
    const distance = "100";
    let gender = ''
    let age = ''
    let weight = ''
    if(setGender.value == 'Male') {
        gender = 'Men'
      }
    else{
    gender = 'Women'
      }


    function getWeight(){
      if(typeof setWeight == 'undefined'){
        return '80Kg'
      }
      return setWeight.value
    }


    function getAge(){
        if(setAge === null){
        setAgeOption(ageOptions[0].value);
      }
     if(setAge.value == 'Junior'){
        return 'Jr'
      }
     if(setAge.value == 'Senior'){
        return 'Elite'
      }

      return setAge.value
    }

    setCategoryFormed(getAge()+''+getWeight()+''+gender);
    localStorage.setItem('category', categoryFormed);

    const response = await fetch("http://localhost:4000/benchmarkTimes/"+categoryFormed+"/"+activeLevel);
    const data = await response.json();
    await setGr(data);
    }
    submit();
    }, [setGender, setAge, setWeight, benchmarkActiveTab]);

    function jsonToArray(json){
    return Object.keys(json).map(key => ({[key]: json[key]}));
    }

//    handleSubmit();

    const [resultsActiveTab, setResultsActiveTab] = useState(0);

    // loop over Data2 to Data7 and store minimum splits in a single array
        const allData = [Data2, Data3, Data4, Data5, Data6, Data7];
        const minSplits = [];

        for (let i = 0; i < allData.length; i++) {
          const min = Math.min(...allData[i].map((data) => data.split));
          minSplits.push(min);
        }

        function convertDurationtoSeconds(duration){
    const [minutes, seconds] = duration.split(':');
    return Number(minutes) * 60 + Number(seconds);
};



const [chartData, setChartData] = useState({
  labels: Data.map((data) => data.distance),
  datasets: [
    {
      data: Object.values(gr).map((data) => data.time),
      label: 'Benchmark Split',
      backgroundColor: 'rgba(255, 159, 64, 0.2)',
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1,
      fill: true,
      type: 'line'
    },
    {
      label: 'Split',
      data: minSplits.map((data) => data),
      backgroundColor: 'blue',
      borderColor: "blue",
      borderWidth: 1,
      type: 'scatter'
    }
  ]
});


useLayoutEffect(() => {
//  const activeDataSet = benchmarkSets[benchmarkActiveTab];
  const activeDataSet = gr;
  const updatedChartData = {
    ...chartData,
    datasets: [
      {
        ...chartData.datasets[0],
//        data: activeDataSet.map((data) => convertDurationtoSeconds(data.split)),
        data: activeDataSet.map((data) => (data.time)),
      },
      {
        ...chartData.datasets[1],
        data: minSplits.map((data) => data),
      }
    ]
  };
  setChartData(updatedChartData);
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  // Scroll the window back to its previous position
  window.scrollTo(0, scrollPosition);
}, [benchmarkActiveTab, gr, setGender, setAge, setWeight]);

const [resultsData, setResultsData] = useState({
  labels: [], // <-- Leave empty to preload the graph
  datasets: [
    {
      label: "Time",
      data: [], // <-- Leave empty to preload the graph
      backgroundColor: 'blue',
      borderColor: 'blue',
      borderWidth: 1,
      type: 'line',
      tension: 0.3
    },
    {
      label: "Average Time",
      data: [], // <-- Leave empty to preload the graph
      backgroundColor: 'green',
      borderColor: 'green',
      borderWidth: 1,
      type: 'line',
      tension: 0.3
    }
  ]
});

function WeightDropdown(props) {
  const handleDropdownChange = (setWeight) => {
    props.setWeightOption(setWeight);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: '225px' // Change the width here
    })
  };

  return (
    <Select
      options={weightOptions}
      value={props.selectedOption} // Set the default value to the first option
//      value={setWeight} // Set the default value to the first option
      onChange={handleDropdownChange}
      styles={customStyles}
      placeholder="Weight"
    />
  );
}



function AgeDropdown(props) {
  const handleDropdownChange = (setAge) => {
    props.setAgeOption(setAge);
  };

        const customStyles = {
    control: (provided) => ({
      ...provided,
      width: '225px' // Change the width here
    })
  };

  return (
    <Select
    selected={props.setAge}
      options={ageOptions}
      value={props.selectedOption}
//      value={setAge}
      onChange={handleDropdownChange}
      styles={customStyles}
        placeholder="Age"

    />
  );
}

function GenderDropdown(props) {
  const handleDropdownChange = (setGender) => {
    props.setGenderOption(setGender);
  };

  const state = {
  value: {label: props.setGender, value: props.setGender}
  }

      const customStyles = {
    control: (provided) => ({
      ...provided,
      width: '225px' // Change the width here
    })
  };

  return (
    <Select
      options={genderOptions}
      value={props.selectedOption}
//      value={setGender}
      onChange={handleDropdownChange}
      styles={customStyles}
      placeholder='Gender'
    />
  );
}

const [userResults, setUserResults] = useState([]);
const [resultsArray, setResultsArray] = useState([[], [], [], [], [], []]);

useEffect(() => {
    async function get_user_results() {
        const user_results = await fetch('http://localhost:4000/results?user_name='+username+'');
        const data = await user_results.json();
        setUserResults(data);
    }
    get_user_results();
}, []);

useEffect(() => {
    function resultsByDistance() {
        const newResultsArray = [[], [], [], [], [], []];
        for(let i = 0; i < userResults.length; i++) {
            const distance = userResults[i].distance;
            const time = userResults[i].time;
            const date = userResults[i].date;
            const result = {
                distance: distance,
                time: time,
                date: date
            }
            if (distance === '100m') {
                newResultsArray[0].push(result);
            } else if (distance === '500m') {
                newResultsArray[1].push(result);
            } else if (distance === '1000m') {
                newResultsArray[2].push(result);
            } else if (distance === '2000m') {
                newResultsArray[3].push(result);
            } else if (distance === '6000m') {
                newResultsArray[4].push(result);
            } else if (distance === '10000m') {
                newResultsArray[5].push(result);
            }
        }
        setResultsArray(newResultsArray);
    }
    resultsByDistance();
}, [userResults]);

function sortResultsArrayByDate(array) {
    array.sort(function(a, b) {
        var dateA = new Date(a.date), dateB = new Date(b.date);
        return dateA - dateB;
    });
}


// convert userResults to array
function userToArray(json) {
    const array = [];
    for (let i = 0; i < json.length; i++) {
        array.push(json[i]);
    }
    return array;
}

useEffect(() => {
  if (userResults.length > 0) {
    const dataSets = Object.values(userResults);

    const data = resultsArray[resultsActiveTab].sort(function(a, b) {
        var dateA = new Date(a.date), dateB = new Date(b.date);
        return dateA - dateB;
    }
    );
    const labels = data.map((data) => data.date);
    const splits = data.map((data) => (data.time));

    const averageSplit = splits.reduce((a, b) => a + b, 0) / splits.length;

    setResultsData((prevState) => ({
      ...prevState,
      labels: labels,
      datasets: [
        {
          ...prevState.datasets[0],
          data: splits,
        },
        {
          ...prevState.datasets[1],
          data: Array(labels.length).fill(averageSplit),
        }
      ]
    }));
  }
}, [userResults, resultsActiveTab, resultsArray]);



  function handleResultsTabSelect(index) {
    setResultsActiveTab(index);
  }

  function handleBenchmarkTabSelect(index) {
//    localStorage.setItem('benchmarkActiveTab', index);
    setBenchmarkActiveTab(index);

  }

      const [personalBests, setPersonalBests] = useState([]);


  const benchmarkChangeOptions =
  {
    animation: true,
    animationDuration: 1000 // set the duration of animation in ms
  };

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
    console.log('personalBests', personalBests);
    }
    getPersonalBests();
    }, [benchmarkActiveTab]);


//    const [categoryFormed, setCategoryFormed] = useState('Jr70KgMen');
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
    console.log('levels', levels[benchmarkActiveTab]);

    const response = await fetch('http://localhost:4000/benchmarkTimes/'+categoryFormed+'/'+levels[benchmarkActiveTab]+'');
    const data = await response.json();

    console.log('active tab', benchmarkActiveTab);
    setBenchmarkTimes(Object.values(data));
    console.log('benchmarkTimes', benchmarkTimes)
    }
    getBenchmarkTimes();
    }, [benchmarkActiveTab, categoryFormed]);




   function secondsToMMSS(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes}:${secondsLeft}`;
   }


return (
<>
      <div class="col-sm-6">
        <div class="well">
<Tabs forceRenderTabPanel={true} defaultIndex={0}>
<TabList>
<Tab>Results</Tab>
<Tab>Benchmarks</Tab>
</TabList>
<TabPanel>
<Tabs onSelect={handleResultsTabSelect} forceRenderTabPanel={true} selectedIndex={resultsActiveTab} defaultIndex={0}>
<TabList>
<Tab>100m</Tab>
<Tab>500m</Tab>
<Tab>1000m</Tab>
<Tab>2000m</Tab>
<Tab>6000m</Tab>
<Tab>10000m</Tab>
</TabList>
<TabPanel>
< Line data={resultsData} options={{ animation: false }} />
</TabPanel>
<TabPanel>
< Line data={resultsData} options={{ animation: false }} />
</TabPanel>
<TabPanel>
< Line data={resultsData} options={{ animation: false }} />
</TabPanel>
<TabPanel>
< Line data={resultsData} options={{ animation: false }} />
</TabPanel>
<TabPanel>
< Line data={resultsData} options={{ animation: false }} />
</TabPanel>
<TabPanel>
< Line data={resultsData} options={{ animation: false }} />
</TabPanel>
</Tabs>
</TabPanel>
<TabPanel>
<Tabs onSelect={handleBenchmarkTabSelect} forceRenderTabPanel={true} selectedIndex={benchmarkActiveTab} defaultIndex={0}>
<TabList>
<div className="container">
<div className="d-flex">
<GenderDropdown selectedOption={setGender} setGender={setGender} setGenderOption={setGenderOption} />
<AgeDropdown selectedOption={setAge} setAge={setAge} setAgeOption={setAgeOption} />

{setAge.value !== 'U14' && setAge.value !== 'U16' && typeof setAge !== 'undefined' && (
<WeightDropdown selectedOption={setWeight} setWeight={setWeight} setWeightOption={setWeightOption} />
)}
</div>
</div>
<Tab>Elite 1</Tab>
<Tab>Elite 2</Tab>
<Tab>Elite 3</Tab>
<Tab>Elite 4</Tab>
<Tab>Pre-Elite 5</Tab>
<Tab>Pre-Elite 6</Tab>
<Tab>Pre-Elite 7</Tab>
<Tab>Pre-Elite 8</Tab>
<Tab>Development 9</Tab>
<Tab>Development 10</Tab>
<Tab>Development 11</Tab>
<Tab>Development 12</Tab>
</TabList>
<TabPanel>
< Line data={chartData} options={benchmarkChangeOptions}/>
</TabPanel>
<TabPanel>
<Line data={chartData} options={benchmarkChangeOptions}/>
</TabPanel>
<TabPanel>
< Line data={chartData} options={benchmarkChangeOptions}/>
</TabPanel>
<TabPanel>
< Line data={chartData} options={benchmarkChangeOptions}/>
</TabPanel>
<TabPanel>
< Line data={chartData} options={benchmarkChangeOptions}/>
</TabPanel>
<TabPanel>
< Line data={chartData} options={benchmarkChangeOptions}/>
</TabPanel>
<TabPanel>
< Line data={chartData} options={benchmarkChangeOptions}/>
</TabPanel>
<TabPanel>
< Line data={chartData} options={benchmarkChangeOptions}/>
</TabPanel>
<TabPanel>
< Line data={chartData} options={benchmarkChangeOptions}/>
</TabPanel>
<TabPanel>
< Line data={chartData} options={benchmarkChangeOptions}/>
</TabPanel>
<TabPanel>
< Line data={chartData} options={benchmarkChangeOptions}/>
</TabPanel>
<TabPanel>
< Line data={chartData} options={benchmarkChangeOptions}/>
</TabPanel>
</Tabs>
</TabPanel>
</Tabs>
</div>
</div>
      <div class="col-sm-6">
        <div class="well">
            <h3 class="text-center">Benchmark results for {categoryFormed}</h3>
            <div>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Distance</th>
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
          <td>{secondsToMMSS(personalBests[0]/5)}</td>
          <td>{secondsToMMSS(personalBests[0])}</td>
          <td>{secondsToMMSS(benchmarkTimes[0].time/5)}</td>
          <td>{secondsToMMSS(benchmarkTimes[0].time)}</td>
          <td>{Math.floor((benchmarkTimes[0].time/personalBests[0])*100)}%</td>
        </tr>
        <tr>
          <td>500</td>
          <td>{secondsToMMSS(personalBests[1])}</td>
          <td>{secondsToMMSS(personalBests[1])}</td>
          <td>{secondsToMMSS(benchmarkTimes[1].time/5)}</td>
          <td>{secondsToMMSS(benchmarkTimes[1].time)}</td>
          <td>{Math.floor((benchmarkTimes[1].time/personalBests[1])*100)}%</td>
        </tr>
        <tr>
          <td>1000</td>
          <td>{secondsToMMSS(personalBests[2]*2)}</td>
          <td>{secondsToMMSS(personalBests[2])}</td>
          <td>{secondsToMMSS(benchmarkTimes[2].time/5)}</td>
          <td>{secondsToMMSS(benchmarkTimes[2].time)}</td>
          <td>{Math.floor((benchmarkTimes[2].time/personalBests[2])*100)}%</td>
        </tr>
        <tr>
          <td>2000</td>
          <td>{secondsToMMSS(personalBests[3]*4)}</td>
          <td>{secondsToMMSS(personalBests[3])}</td>
          <td>{secondsToMMSS(benchmarkTimes[3].time/5)}</td>
          <td>{secondsToMMSS(benchmarkTimes[3].time)}</td>
          <td>{Math.floor((benchmarkTimes[3].time/personalBests[3])*100)}%</td>
        </tr>
        <tr>
          <td>6000</td>
          <td>{secondsToMMSS(personalBests[4]*12)}</td>
          <td>{secondsToMMSS(personalBests[4])}</td>
          <td>{secondsToMMSS(benchmarkTimes[4].time/5)}</td>
          <td>{secondsToMMSS(benchmarkTimes[4].time)}</td>
          <td>{Math.floor((benchmarkTimes[4].time/personalBests[4])*100)}%</td>
        </tr>
        <tr>
          <td>10000</td>
          <td>{secondsToMMSS(personalBests[5]*20)}</td>
          <td>{secondsToMMSS(personalBests[5])}</td>
          <td>{secondsToMMSS(benchmarkTimes[5].time/5)}</td>
          <td>{secondsToMMSS(benchmarkTimes[5].time)}</td>
          <td>{Math.floor((benchmarkTimes[5].time/personalBests[5])*100)}%</td>
        </tr>
      </tbody>
    </Table>
    </div>
        </div>
        </div>
      </>
    );
}

export function ResultsLayout(){

    return (
    <div>
    <div class="row">
      <div class="col fs-3">Date</div>
      <div class="col fs-3">Position</div>
      <div class="col fs-3">Time</div>
      <hr />
    </div>
   <div class="row">
        <div class="col">10/01/2022</div>
        <div class="col">3</div>
        <div class="col">00:23</div>
    </div>
    <div class="row">
        <div class="col">10/01/2022</div>
        <div class="col">3</div>
        <div class="col">00:23</div>
    </div>
    </div>
);

}

export function Tabss(){
    return (
  <Tabs defaultIndex={0}>
    <TabList>
      <Tab>100m</Tab>
      <Tab>500m</Tab>
      <Tab>1000m</Tab>
      <Tab>2000m</Tab>
      <Tab>6000m</Tab>
      <Tab>10000m</Tab>
    </TabList>

    <div className="flex flex-col">
    <TabPanel>
    <ResultsLayout />
    </TabPanel>
    <TabPanel>
    <ResultsLayout />
    </TabPanel>
    <TabPanel>
    <ResultsLayout />
    </TabPanel>
    <TabPanel>
    <ResultsLayout />
    </TabPanel>
    <TabPanel>
    <ResultsLayout />
    </TabPanel>
    <TabPanel>
    <ResultsLayout />
    </TabPanel>
    </div>
  </Tabs>
);
}

export function Benchmarkk(){

    useEffect(() => {
    console.log('benchmarkActiveTab', localStorage.getItem('benchmarkActiveTab'));
    }
    , [localStorage.getItem('benchmarkActiveTab')]);

    return (
    < BenchmarkResultsTable benchmarkActiveTab={localStorage.getItem('benchmarkActiveTab')} />
    );
}


