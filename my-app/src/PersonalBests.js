import {
    useEffect,
    useState
} from 'react';

export function PersonalBests() {

    const [personalBests, setPersonalBests] = useState([]);

    useEffect(() => {
        console.log("PersonalBests useEffect");

        const getPersonalBests = async () => {
            const username = localStorage.getItem("username");
            const response = await fetch(`http://localhost:4000/results?user_name=${username}`);
            const data = await response.json();
            console.log('pbs', data)

            const lowestTimeForEachDistance = {};

            data.forEach(result => {
                const distance = result.distance;
                const time = result.time;
                if (!lowestTimeForEachDistance[distance] || time < lowestTimeForEachDistance[distance]) {
                    lowestTimeForEachDistance[distance] = time;
                }
            });

            setPersonalBests(Object.values(lowestTimeForEachDistance));
            console.log('lowestTimeForEachDistance', lowestTimeForEachDistance);
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

    const levels = ['Elite1', 'Elite2', 'Elite3', 'Elite4', 'PreElite1', 'PreElite2', 'PreElite3', 'PreElite4',
    'Development1', 'Development2', 'Development3', 'Development4'];

    const response = await fetch('http://localhost:4000/benchmarkTimes/Jr70KgMen/Elite1');
    const data = await response.json();

    setBenchmarkTimes(Object.values(data));
    console.log('benchmarkTimes', benchmarkTimes)
    }
    getBenchmarkTimes();
    }, []);


    function secondsToMMSSss(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secondsLeft = seconds % 60;
        return '0' + `${minutes}:${secondsLeft}` + '0';
    }

    function secondsToMMSS(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secondsLeft = seconds % 60;
        if (minutes < 10) {
            return '0' + `${minutes}:${secondsLeft}`;
        }
        return `${minutes}:${secondsLeft}`;
    }

console.log('personalBests', personalBests);

    // get first item in personalBests array
    return (
    <>
      <h4 class="text-center">Personal Bests</h4>
      <p> 100m: {secondsToMMSS(personalBests[0]/5)} <span className={Math.floor((benchmarkTimes[0].time/personalBests[0])*100) < 100 ? 'text-danger d-inline' : 'text-success d-inline' }> ({Math.floor((benchmarkTimes[0].time/personalBests[0])*100)}%) </span>
      </p>
      <p> 500m: {secondsToMMSS(personalBests[1])} <span className={Math.floor((benchmarkTimes[1].time/personalBests[1])*100) < 100 ? 'text-danger d-inline' : 'text-success d-inline' }> ({Math.floor((benchmarkTimes[1].time/personalBests[1])*100)}%) </span>
      </p>
      <p> 1000m: {secondsToMMSS(personalBests[2]*2)} <span className={Math.floor((benchmarkTimes[2].time/personalBests[2])*100) < 100 ? 'text-danger d-inline' : 'text-success d-inline' }> ({Math.floor((benchmarkTimes[2].time/personalBests[2])*100)}%) </span>
      </p>
      <p> 2000m: {secondsToMMSS(personalBests[3]*4)} <span className={Math.floor((benchmarkTimes[3].time/personalBests[3])*100) < 100 ? 'text-danger d-inline' : 'text-success d-inline' }> ({Math.floor((benchmarkTimes[3].time/personalBests[3])*100)}%) </span>
      </p>
      <p> 6000m: {secondsToMMSS(personalBests[4]*12)} <span className={Math.floor((benchmarkTimes[4].time/personalBests[4])*100) < 100 ? 'text-danger d-inline' : 'text-success d-inline' }> ({Math.floor((benchmarkTimes[4].time/personalBests[4])*100)}%) </span>
      </p>
      <p> 10000m: {secondsToMMSS(personalBests[5]*20)} <span className={Math.floor((benchmarkTimes[5].time/personalBests[5])*100) < 100 ? 'text-danger d-inline' : 'text-success d-inline' }> ({Math.floor((benchmarkTimes[5].time/personalBests[5])*100)}%) </span>
      </p>
    </>
    );
}