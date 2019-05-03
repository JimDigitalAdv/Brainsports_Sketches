const scoreBoard = {
  _round: 0,
  _home: 0,
  _away: 0,
  range: [0, 99],
  set home(val) {
    this._home = val;
    document.querySelector('#team1').textContent = this._home;
  },
  set away(val) {
    this._away = val;
    document.querySelector('#team2').textContent = this._away;
  },
  set round(val) {
    this._round = val;
    document.querySelector('#roundnum').textContent = this._round;
  },
  checkRangeAndUpdate(value, operator, step) {
    // destructure max and min
    const [min, max] = this.range;
    // set getter to underscore value for accessing object
    const getter = `_${value}`;
    if(operator === '+' && (this[getter] + step) - 1 < max) {
      // if operator is add and the incrementation wont exceede max increment by step
      this[value] = this[getter] + step;
    }
    if(operator === '-' && (this[getter] - step) + 1 > min) {
      // if operator is sub and the decrementation wont go below min deincrement by step
     this[value] = this[getter] - step;
    }
  },
  homeplus:   ['home', '+', 1],
  homeminus:  ['home', '-', 1],
  awayplus:   ['away', '+', 1],
  awayminus:  ['away', '-', 1],
  roundplus:  ['round', '+', 1],
  roundminus: ['round', '-', 1]
}

function init() {
  const container = document.querySelector('.scorecontainer');
  container.addEventListener('click', function(e) {
    // run function with params that match the buttons id
    scoreBoard.checkRangeAndUpdate.apply(scoreBoard, scoreBoard[e.target.id]);
  });
}

init();



var stopped=true;
var m = 0;
var s = 0;
document.getElementById('timer').innerHTML = 00 + ":" + 00;

function timer_start() {
  stopped=false;
  startTimer();
}

function timer_stop() {
  stopped=true;
}

function timer_reset(){
  s=0;
document.getElementById('timer').innerHTML = 00 + ":" + 00;
}

function timer_add(){
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  m = timeArray[0];
  m=parseInt(m)+1;
  document.getElementById('timer').innerHTML = m + ":" + s;
}

function timer_sub(){
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  m = timeArray[0];
  m=parseInt(m)-1;
  document.getElementById('timer').innerHTML = m + ":" + s;
}


function startTimer() {
  if (stopped==false){
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  m = timeArray[0];
  s = checkSecond((timeArray[1] - 1));
  if(s==59){
    m=m-1
  }

  if(m<1 && s<1){
    document.getElementById('timer').style.backgroundColor = "red";
  }
  if(m<0){
      alert('timer completed');
      stopped=true;
      document.getElementById('timer').style.backgroundColor = "black";
      m=1;
      s = checkSecond(0);
    }
  document.getElementById('timer').innerHTML = m + ":" + s;
  setTimeout(startTimer, 1000);
  }
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}
