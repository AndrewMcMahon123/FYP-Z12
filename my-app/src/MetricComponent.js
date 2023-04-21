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

import { useState, useEffect } from 'react';

export function MetricComponent(props) {

    const [personalBests, setPersonalBests] = useState([71, 75, 86, 87, 94, 96]);
    const distances = [100, 500, 1000, 2000, 6000, 10000];
    const [count, setCount] = useState(0);

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

        const [benchmarkTimes, setBenchmarkTimes] = useState([
{category: 'Jr 70kg Men', level: 'Elite1', distance: 100, time: 78},
{category: 'Jr 70kg Men', level: 'Elite1', distance: 500, time: 84},
{category: 'Jr 70kg Men', level: 'Elite1', distance: 1000, time: 90},
{category: 'Jr 70kg Men', level: 'Elite1', distance: 2000, time: 93},
{category: 'Jr 70kg Men', level: 'Elite1', distance: 6000, time: 99},
{category: 'Jr 70kg Men', level: 'Elite1', distance: 10000, time: 102}]);

    useEffect(() => {
    async function getBenchmarkTimes() {

    const response = await fetch('http://localhost:4000/benchmarkTimes/Jr70KgMen/Elite1');
    const data = await response.json();

    setBenchmarkTimes(Object.values(data));
    }
    getBenchmarkTimes();
    }, []);

       function secondsToMMSSss(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return '0'+`${minutes}:${secondsLeft}`;
    }

   function secondsToMMSS(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    if(minutes < 10){
    return '0'+`${minutes}:${secondsLeft}`;
    }
    return `${minutes}:${secondsLeft}`;
   }

    function getPercentage(benchmarkTime, personalBest) {
        const percentage = Math.round((personalBest / benchmarkTime) * 100);
        return percentage+'%';
    }

    return (
    <>
        <div className="text-center">
        <button type="button" class="btn btn-primary btn-sm" onClick={() => {
              if (count + 1 > 5) {
                setCount(0);
              } else {
                setCount(count + 1);
              }
            }}>Next</button>
        </div>
        <Card maxWidth="max-w-0 hFull">
            <Flex alignItems="items-start">
                <Block>
                    <Metric>{distances[count]}m</Metric>
                    <Text textAlignment="text-center">{secondsToMMSSss(personalBests[count]/5)}</Text>
                </Block>
                <Badge color="green" text={getPercentage(benchmarkTimes[count].time, personalBests[count])}/>
            </Flex>
            <Flex marginTop="mt-4">
                <Text truncate={ true }>
                    {getPercentage(benchmarkTimes[count].time, personalBests[count])}
                </Text>
                <Text>{secondsToMMSSss(personalBests[count]/5)}</Text>
            </Flex>
            <ProgressBar
              percentageValue={Math.round((personalBests[count] / benchmarkTimes[count].time) * 100)}
              color={Math.round((personalBests[count] / benchmarkTimes[count].time) * 100) < 100 ? 'red' : 'green'}
              marginTop="mt-2"
            />
        </Card>
    </>
    );
}