const startStop = document.querySelector('.start_stop');
const clearLap = document.querySelector('.clear_lap');
const container = document.querySelector('.container');
const lapTimeContainer = document.querySelector('.new_time_container');
const minutesContainer = document.querySelector('.minutes');
const secondsContainer = document.querySelector('.seconds');
const millisecondsContainer = document.querySelector('.milliseconds');
const sound = document.querySelector('#sound1');
const lapWrapper = document.querySelector('.lap_wrapper');

document.addEventListener('DOMContentLoaded', clearStopWatch);

startStop.addEventListener('click', () => {
    if (startStop.innerHTML === 'START') {
        startStop.innerHTML = 'STOP';
        clearLap.innerHTML = 'LAP';
        startStop.style.backgroundColor = '#ff4800';
        clearLap.style.backgroundColor = '#7fff00';

        showTime = setInterval(startApp, 10);
        showLapTime = setInterval(newLapTime, 10);
        return;
    }
    startStop.innerHTML = 'START';
    clearLap.innerHTML = 'CLEAR';
    startStop.style.backgroundColor = '#7fff00';
    clearLap.style.backgroundColor = '#ff4800';
    clearInterval(showTime);
    clearInterval(showLapTime);
})

clearLap.addEventListener('click', () => {
    if (clearLap.innerHTML === 'CLEAR') {
        clearStopWatch();
        lapWrapper.classList.remove('show_lap_wrapper');
    } else {
        addLapTime();
        lapWrapper.classList.add('show_lap_wrapper');
    }
})

let milliseconds = 0;

function startApp() {
    milliseconds += 10;
    let dateTime = new Date(milliseconds);

    let startMinutes = dateTime.getMinutes();
    let startSeconds = dateTime.getSeconds();
    let startMilliseconds = Math.round((dateTime.getMilliseconds()) / 10);

    minutesContainer.innerHTML = formatTime(startMinutes);
    secondsContainer.innerHTML = `: ${formatTime(startSeconds)}`;
    millisecondsContainer.innerHTML = `: ${formatTime(startMilliseconds)}`;
}

function formatTime(item) {
    if (String(item).length < 2) {
        return `0${item}`;
    }
    return item;
}

function clearStopWatch() {
    minutesContainer.innerHTML = '00 :';
    secondsContainer.innerHTML = '00 ';
    millisecondsContainer.innerHTML = ' 00';
    lapTimeContainer.innerHTML = '00 : 00 : 00';
    milliseconds = 0;
    numOfLap = 1;

    let lapContainer = document.querySelectorAll('.lap_container');
    lapContainer.forEach((item) => {
        item.remove();
    });
}


// Function for laps time
let dateMilliseconds = 0,
    lapMinutes = 0,
    lapSecond = 0,
    lapMillisec = 0;

function newLapTime() {
    dateMilliseconds += 10;
    newDateTime = new Date(dateMilliseconds);

    lapMinutes = newDateTime.getMinutes();
    lapSecond = newDateTime.getSeconds();
    lapMillisec = Math.round((newDateTime.getMilliseconds()) / 10);

    lapTimeContainer.innerHTML = `${formatTime(lapMinutes)} : ${formatTime(lapSecond)} : ${formatTime(lapMillisec)}`;
}

// Add new laps time in container
let numOfLap = 1;
function addLapTime() {
    let lapContainer = document.createElement('div');
    let newLap = document.createElement('div');

    lapContainer.classList.add('lap_container');
    newLap.classList.add('lap');

    container.append(lapContainer);
    lapContainer.append(newLap);
    newLap.innerText = `Lap ${numOfLap} :  `;

    newLap.innerHTML = `Lap ${numOfLap} -- ${formatTime(lapMinutes)} : ${formatTime(lapSecond)} : ${formatTime(lapMillisec)}`;
    numOfLap++;
    dateMilliseconds = 0;
}

container.addEventListener('mousedown', (event) => {
    if (event.target.tagName !== 'BUTTON') return;
    sound.play();
})
