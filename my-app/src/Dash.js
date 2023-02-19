import {
    Badge,
    Block,
    Card,
    Flex,
    Metric,
    ProgressBar,
    Text,
    Title,
} from '@tremor/react';

// import date


import * as moment from 'moment';
import 'moment-duration-format';

import {
    UserGroupIcon,
    UserIcon,
} from '@heroicons/react/solid';

import Table from 'react-bootstrap/Table';

import ResultsGraph from "./ResultsGraph";


import { useState, useEffect } from 'react';

import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";


import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LineChart, PieChart } from 'react-chartkick'
import 'chartkick/chart.js'
import { Data, Data2 } from "./Data";
import BenchmarkChart from "./BenchmarkChart";

function formatSecondsToMinutesAndSeconds(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}


// Single KPI card in the demo dashboard with sample inputs
export function KpiCard() {
    return (
        <Card maxWidth="max-w-0 hFull">
            <Flex alignItems="items-start">
                <Block>
                    <Metric>100m</Metric>
                    <Text
                    textAlignment="text-center"
                    >00:21</Text>
                </Block>
                <Badge color="green" text="102%" />
            </Flex>
            <Flex marginTop="mt-4">
                <Text truncate={ true }>
                    102%
                </Text>
                <Text>00:25 </Text>
            </Flex>
            <ProgressBar percentageValue={ 102 } color="green" marginTop="mt-2" />
        </Card>
    );
}


export function Graph(){
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.distance),
    datasets: [
      {
        label: "Benchmark Split",
        data: Data.map((data) => data.time),
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
  console.log('thischartdata', chartData);
//  const [resultsData , setResultsData] = useState({
//    labels: Data2.map((data) => data.distance),
//    datasets: [
//        {
//        label: "Time",
//        data: Data2.map((data) => moment.duration(parseInt(data.split), 'seconds').format('mm:ss')),
//        backgroundColor: 'blue',
//        borderColor: "blue",
//        backgroundColor: 'blue',
//        borderColor: 'blue',
//        borderWidth: 1,
//        type: 'line'
//        }
//    ]
//    });

//const [resultsData, setResultsData] = useState({
//  labels: Data2.map((data) => data.distance),
//  datasets: [
//    {
//      label: "Time",
//      data: Data2.map((data) => parseInt(data.split) * 1000),
//      backgroundColor: 'blue',
//      borderColor: 'blue',
//      borderWidth: 1,
//      type: 'line'
//    }
//  ]
//});
//
//
//   const options = {
//  scales: {
//    yAxes: [{
//      type: 'time',
//      time: {
//        parser: 'H:mm',
//        unit: 'hour',
//        stepSize: 1,
//        displayFormats: {
//          hour: 'H:mm'
//        },
//        tooltipFormat: 'H:mm'
//      },
//    }]
//  }
//};

const [resultsData, setResultsData] = useState({
  labels: Data2.map((data) => moment.duration(parseInt(data.split), 'seconds').format('mm:ss')),
  datasets: [
    {
      label: "Time",
      data: Data2.map((data) => parseInt(data.split)),
      backgroundColor: 'blue',
      borderColor: 'blue',
      borderWidth: 1,
      type: 'line',
      tension: 0.5
    }
  ]
});


   const [resultsActiveTab, setResultsActiveTab] = useState(0);

  function handleResultsTabSelect(index) {
    setResultsActiveTab(index);
    console.log(`Selected tab index is ${index}`);
  }

  const [benchmarkActiveTab, setBenchmarkActiveTab] = useState(0);

  function handleBenchmarkTabSelect(index) {
    setBenchmarkActiveTab(index);
    console.log(`Selected tab index is ${index}`);

  }


return (
<>
<Tabs forceRenderTabPanel={true} defaultIndex={0}>
<TabList>
<Tab>Results</Tab>
<Tab>Benchmarks</Tab>
</TabList>
<TabPanel>
<Tabs  onSelect={handleResultsTabSelect} forceRenderTabPanel={true} selectedIndex={resultsActiveTab}>
<TabList>
<Tab>100m</Tab>
<Tab>500m</Tab>
<Tab>1000m</Tab>
<Tab>2000m</Tab>
<Tab>6000m</Tab>
<Tab>10000m</Tab>
</TabList>
<TabPanel>
< Line data={resultsData}/>
</TabPanel>
<TabPanel>
<LineChart label="boom" height="445px" data={{"2021-05-13":2,"2021-05-14":5,"2021-05-15":3,"2021-05-16":8,"2021-05-17":6,"2021-05-18":6,"2021-05-19":12,"2021-05-20":5,"2021-05-21":5,"2021-05-22":3,"2021-05-23":1,"2021-05-24":6,"2021-05-25":1,"2021-05-26":3,"2021-05-27":2,"2021-05-28":3,"2021-05-29":2,"2021-05-30":8,"2021-05-31":5}} />
</TabPanel>
<TabPanel>
<LineChart label="boom" height="445px" data={{"2021-05-13":2,"2021-05-14":5,"2021-05-15":3,"2021-05-16":8,"2021-05-17":6,"2021-05-18":6,"2021-05-19":12,"2021-05-20":5,"2021-05-21":5,"2021-05-22":3,"2021-05-23":1,"2021-05-24":6,"2021-05-25":1,"2021-05-26":3,"2021-05-27":2,"2021-05-28":3,"2021-05-29":2,"2021-05-30":8,"2021-05-31":5}} />
</TabPanel>
<TabPanel>
<LineChart label="boom" height="445px" data={{"2021-05-13":2,"2021-05-14":5,"2021-05-15":3,"2021-05-16":8,"2021-05-17":6,"2021-05-18":6,"2021-05-19":12,"2021-05-20":5,"2021-05-21":5,"2021-05-22":3,"2021-05-23":1,"2021-05-24":6,"2021-05-25":1,"2021-05-26":3,"2021-05-27":2,"2021-05-28":3,"2021-05-29":2,"2021-05-30":8,"2021-05-31":5}} />
</TabPanel>
<TabPanel>
<LineChart label="boom" height="445px" data={{"2021-05-13":2,"2021-05-14":5,"2021-05-15":3,"2021-05-16":8,"2021-05-17":6,"2021-05-18":6,"2021-05-19":12,"2021-05-20":5,"2021-05-21":5,"2021-05-22":3,"2021-05-23":1,"2021-05-24":6,"2021-05-25":1,"2021-05-26":3,"2021-05-27":2,"2021-05-28":3,"2021-05-29":2,"2021-05-30":8,"2021-05-31":5}} />
</TabPanel>
<TabPanel>
<ResultsGraph chartData={chartData} />
</TabPanel>
</Tabs>
</TabPanel>
<TabPanel>
<Tabs onSelect={handleBenchmarkTabSelect} forceRenderTabPanel={true} selectedIndex={benchmarkActiveTab}>
<TabList>
<Tab>Elite 1</Tab>
<Tab>Elite 2</Tab>
<Tab>Elite 3</Tab>
<Tab>Elite 4</Tab>
<Tab>Pre-Elite 5</Tab>
<Tab>Pre-Elite 6</Tab>
<Tab>Pre-Elite 7</Tab>
<Tab>Pre-Elite 8</Tab>
<Tab>Pre-Elite 9</Tab>
<Tab>Development 10</Tab>
<Tab>Development 11</Tab>
<Tab>Development 12</Tab>
</TabList>
<TabPanel>
<BenchmarkChart chartData={chartData} />
</TabPanel>
<TabPanel>
<BenchmarkChart chartData={chartData} />
</TabPanel>
<TabPanel>
<LineChart label="boom" height="445px" data={{"2021-05-13":2,"2021-05-14":5,"2021-05-15":3,"2021-05-16":8,"2021-05-17":6,"2021-05-18":6,"2021-05-19":12,"2021-05-20":5,"2021-05-21":5,"2021-05-22":3,"2021-05-23":1,"2021-05-24":6,"2021-05-25":1,"2021-05-26":3,"2021-05-27":2,"2021-05-28":3,"2021-05-29":2,"2021-05-30":8,"2021-05-31":5}} />
</TabPanel>
<TabPanel>
<LineChart label="boom" height="445px" data={{"2021-05-13":2,"2021-05-14":5,"2021-05-15":3,"2021-05-16":8,"2021-05-17":6,"2021-05-18":6,"2021-05-19":12,"2021-05-20":5,"2021-05-21":5,"2021-05-22":3,"2021-05-23":1,"2021-05-24":6,"2021-05-25":1,"2021-05-26":3,"2021-05-27":2,"2021-05-28":3,"2021-05-29":2,"2021-05-30":8,"2021-05-31":5}} />
</TabPanel>
<TabPanel>
<LineChart label="boom" height="445px" data={{"2021-05-13":2,"2021-05-14":5,"2021-05-15":3,"2021-05-16":8,"2021-05-17":6,"2021-05-18":6,"2021-05-19":12,"2021-05-20":5,"2021-05-21":5,"2021-05-22":3,"2021-05-23":1,"2021-05-24":6,"2021-05-25":1,"2021-05-26":3,"2021-05-27":2,"2021-05-28":3,"2021-05-29":2,"2021-05-30":8,"2021-05-31":5}} />
</TabPanel>
</Tabs>
</TabPanel>
</Tabs>
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
          <td>00:17</td>
          <td>@mdo</td>
          <td>00:34</td>
            <td>00:34</td>
            <td>87%</td>
        </tr>
        <tr>
          <td>500</td>
          <td>x</td>
          <td>01:38</td>
          <td>@mdo</td>
          <td>00:34</td>
            <td>00:34</td>
            <td>87%</td>
        </tr>
        <tr>
          <td>1000</td>
          <td>x</td>
          <td>03:13</td>
          <td>@mdo</td>
          <td>00:34</td>
            <td>00:34</td>
            <td>87%</td>
        </tr>
        <tr>
          <td>2000</td>
          <td>x</td>
          <td>06:46</td>
          <td>@mdo</td>
          <td>00:34</td>
            <td>00:34</td>
            <td>87%</td>
        </tr>
        <tr>
          <td>6000</td>
          <td>x</td>
          <td>21:13</td>
          <td>@mdo</td>
          <td>00:34</td>
            <td>00:34</td>
            <td>87%</td>
        </tr>
        <tr>
          <td>10000</td>
          <td>x</td>
          <td>37:00</td>
          <td>@mdo</td>
          <td>00:34</td>
            <td>00:34</td>
            <td>87%</td>
        </tr>
      </tbody>
    </Table>
    );
}


