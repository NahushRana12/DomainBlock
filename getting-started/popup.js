// Credit: Mateusz Rybczonec

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

const TIME_LIMIT = 600;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">
	${formatTime(timeLeft)}
	</span>
	<button id="myButton" class = "base-play">PLAY</button>
	<button id="myButton2"  class = "base-play" >PAUSE</button>
	<button id="myButton3"  class = "base-play" >RESET</button>

</div>
`;

/* startTimer(); */

function onTimesUp() {
	
  clearInterval(timerInterval);
  timerstart = false;
	
	timePassed = 0;
	timeLeft = TIME_LIMIT;
 timerInterval = null;
	remainingPathColor = COLOR_CODES.info.color;
	document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
}
function stop(){
	
	isPaused = true;console.log("SAsf");
}
document.getElementById("myButton").addEventListener("click", play);
document.getElementById("myButton2").addEventListener("click", stop);
document.getElementById("myButton3").addEventListener("click", onTimesUp);
var isPaused = true;var timerstart = false;
function play(){
		isPaused = false;
		if(timerstart == false){
			startTimer();
		}
		
}
function startTimer() {
	
	isPaused = false;
	timerstart = true;
  timerInterval = setInterval(() => {
	 if(!isPaused) {
    
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }}, 1000);
}

function formatTime(e) {
	 var h = Math.floor(e / 3600).toString().padStart(2,'0'),
        m = Math.floor(e % 3600 / 60).toString().padStart(2,'0'),
        s = Math.floor(e % 60).toString().padStart(2,'0');
    
    //return h + ':' + m + ':' + s;
    return `${h}:${m}:${s}`;

 
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}