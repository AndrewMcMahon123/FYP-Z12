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

import {
    UserGroupIcon,
    UserIcon,
} from '@heroicons/react/solid';

import { useState } from 'react';

import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";


import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LineChart, PieChart } from 'react-chartkick'
import 'chartkick/chart.js'
import { Data } from "./Data";

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
    return (
      <Tabs defaultIndex={0}>
      <div class="text-center">
    <TabList>
      <Tab>100m</Tab>
      <Tab>500m</Tab>
      <Tab>1000m</Tab>
      <Tab>2000m</Tab>
      <Tab>5000m</Tab>
      <Tab>10000m</Tab>
    </TabList>
    </div>

    <div className="flex flex-col">
    <TabPanel>
    <LineChart label="boom" height="500px" data={{"2021-05-13":2,"2021-05-14":5,"2021-05-15":3,"2021-05-16":8,"2021-05-17":6,"2021-05-18":6,"2021-05-19":12,"2021-05-20":5,"2021-05-21":5,"2021-05-22":3,"2021-05-23":1,"2021-05-24":6,"2021-05-25":1,"2021-05-26":3,"2021-05-27":2,"2021-05-28":3,"2021-05-29":2,"2021-05-30":8,"2021-05-31":5}} />
    </TabPanel>
    <TabPanel>
    <LineChart label="boom" height="500px" data={{"2021-05-13":2,"2021-05-14":5,"2021-05-15":3,"2021-05-16":8,"2021-05-17":6,"2021-05-18":6,"2021-05-19":12,"2021-05-20":5,"2021-05-21":5,"2021-05-22":3,"2021-05-23":1,"2021-05-24":6,"2021-05-25":1,"2021-05-26":3,"2021-05-27":2,"2021-05-28":3,"2021-05-29":2,"2021-05-30":8,"2021-05-31":5}} />
    </TabPanel>
    <TabPanel>
    <LineChart label="boom" height="500px" data={{"2021-05-13":2,"2021-05-14":5,"2021-05-15":3,"2021-05-16":8,"2021-05-17":6,"2021-05-18":6,"2021-05-19":12,"2021-05-20":5,"2021-05-21":5,"2021-05-22":3,"2021-05-23":1,"2021-05-24":6,"2021-05-25":1,"2021-05-26":3,"2021-05-27":2,"2021-05-28":3,"2021-05-29":2,"2021-05-30":8,"2021-05-31":5}} />
    </TabPanel>
    <TabPanel>
    <LineChart label="boom" height="500px" data={{"2021-05-13":2,"2021-05-14":5,"2021-05-15":3,"2021-05-16":8,"2021-05-17":6,"2021-05-18":6,"2021-05-19":12,"2021-05-20":5,"2021-05-21":5,"2021-05-22":3,"2021-05-23":1,"2021-05-24":6,"2021-05-25":1,"2021-05-26":3,"2021-05-27":2,"2021-05-28":3,"2021-05-29":2,"2021-05-30":8,"2021-05-31":5}} />
    </TabPanel>
    <TabPanel>
    <LineChart label="boom" height="500px" data={{"2021-05-13":2,"2021-05-14":5,"2021-05-15":3,"2021-05-16":8,"2021-05-17":6,"2021-05-18":6,"2021-05-19":12,"2021-05-20":5,"2021-05-21":5,"2021-05-22":3,"2021-05-23":1,"2021-05-24":6,"2021-05-25":1,"2021-05-26":3,"2021-05-27":2,"2021-05-28":3,"2021-05-29":2,"2021-05-30":8,"2021-05-31":5}} />
    </TabPanel>
    <TabPanel>
    <LineChart label="boom" height="500px" data={{"2021-05-13":2,"2021-05-14":5,"2021-05-15":3,"2021-05-16":8,"2021-05-17":6,"2021-05-18":6,"2021-05-19":12,"2021-05-20":5,"2021-05-21":5,"2021-05-22":3,"2021-05-23":1,"2021-05-24":6,"2021-05-25":1,"2021-05-26":3,"2021-05-27":2,"2021-05-28":3,"2021-05-29":2,"2021-05-30":8,"2021-05-31":5}} />
    </TabPanel>
    </div>
    </Tabs>
);
}

export function ResultsLayout(){

    return (
    <div>
    <div class="row">
      <div class="col fs-3">Date</div>
      <div class="col fs-3">Event Class</div>
      <div class="col fs-3">Boat Class</div>
      <div class="col fs-3">Position</div>
      <div class="col fs-3">Time</div>
      <hr />
   </div>
   <div class="row">
        <div class="col">10/01/2022</div>
        <div class="col">JU18</div>
        <div class="col">2X</div>
        <div class="col">3</div>
        <div class="col">00:23</div>
    </div>
    <div class="row">
        <div class="col">10/01/2022</div>
        <div class="col">JU18</div>
        <div class="col">2X</div>
        <div class="col">3</div>
        <div class="col">00:23</div>
    </div>
    <div class="row">
        <div class="col">10/01/2022</div>
        <div class="col">JU18</div>
        <div class="col">2X</div>
        <div class="col">3</div>
        <div class="col">00:23</div>
    </div>
    <div class="row">
        <div class="col">10/01/2022</div>
        <div class="col">JU18</div>
        <div class="col">2X</div>
        <div class="col">3</div>
        <div class="col">00:23</div>
    </div>
    <div class="row">
        <div class="col">10/01/2022</div>
        <div class="col">JU18</div>
        <div class="col">2X</div>
        <div class="col">3</div>
        <div class="col">00:23</div>
    </div>
    <div class="row">
        <div class="col">10/01/2022</div>
        <div class="col">JU18</div>
        <div class="col">2X</div>
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
      <Tab>5000m</Tab>
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


