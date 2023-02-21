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


import { useState, useEffect, useLayoutEffect } from 'react';

import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";


import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
    const [resultsActiveTab, setResultsActiveTab] = useState(0);
    const [benchmarkActiveTab, setBenchmarkActiveTab] = useState(0);

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

    const benchmarkSets = [Elite1, Elite2, Elite3, Elite4, PreElite1, PreElite2, PreElite3, PreElite4,
    Development1, Development2, Development3, Development4];
    const activeDataSet = benchmarkSets[benchmarkActiveTab];
const [chartData, setChartData] = useState({
  labels: Data.map((data) => data.distance),
  datasets: [
    {
      data: activeDataSet.map((data) => convertDurationtoSeconds(data.split)),
      label: 'Benchmark Split',
      backgroundColor: 'rgba(255, 159, 64, 0.2)',
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1,
      fill: true,
      type: 'line'
    },
    {
      label: "Split",
      data: minSplits.map((data) => data),
      backgroundColor: 'blue',
      borderColor: "blue",
      backgroundColor: 'blue',
      borderColor: 'blue',
      borderWidth: 1,
      type: 'scatter'
    }
  ]
});

useLayoutEffect(() => {
  const activeDataSet = benchmarkSets[benchmarkActiveTab];
  const updatedChartData = {
    ...chartData,
    datasets: [
      {
        ...chartData.datasets[0],
        data: activeDataSet.map((data) => convertDurationtoSeconds(data.split)),
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
}, [benchmarkActiveTab]);

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

useEffect(() => {
  const dataSets = [Data2, Data3, Data4, Data5, Data6, Data7];
  const data = dataSets[resultsActiveTab];
  const labels = data.map((data) => moment(data.date, 'YYYY-MM-DD').format('YYYY-MM-DD'));
  const splits = data.map((data) => parseInt(data.split));
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
}, [resultsActiveTab]);


  function handleResultsTabSelect(index) {
    setResultsActiveTab(index);
    console.log(`Selected tab index is ${index}`);
  }

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
< Line data={chartData} options={{ animation: false }}/>
</TabPanel>
<TabPanel>
<Line data={chartData} options={{ animation: false }}/>
</TabPanel>
<TabPanel>
< Line data={chartData} options={{ animation: false }}/>
</TabPanel>
<TabPanel>
< Line data={chartData} options={{ animation: false }}/>
</TabPanel>
<TabPanel>
< Line data={chartData} options={{ animation: false }}/>
</TabPanel>
<TabPanel>
< Line data={chartData} options={{ animation: false }}/>
</TabPanel>
<TabPanel>
< Line data={chartData} options={{ animation: false }}/>
</TabPanel>
<TabPanel>
< Line data={chartData} options={{ animation: false }}/>
</TabPanel>
<TabPanel>
< Line data={chartData} options={{ animation: false }}/>
</TabPanel>
<TabPanel>
< Line data={chartData} options={{ animation: false }}/>
</TabPanel>
<TabPanel>
< Line data={chartData} options={{ animation: false }}/>
</TabPanel>
<TabPanel>
< Line data={chartData} options={{ animation: false }}/>
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


