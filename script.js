// import { Timer } from "./timer.js";
// import { MovingElement, Element } from "./element.js";

export class Timer {
  constructor(className, time, el) {
    this.time = time;
    this.className = className;
    this.interval = null;
    this.el = el;
  }
  
  start(div) {
    div.innerText = this.formatTimerTxt();
    this.interval = setInterval(() => {
      this.time += 1;
      div.innerText = this.formatTimerTxt();
  
    }, 1000);
  }
  getHtml() {
    let timerDiv = document.createElement("div");
    timerDiv.classList.add(this.className, "timer-el");
    return timerDiv;
  }
  reset() {
    this.time = 0;
  }

  formatTimerTxt() {
    let minutes = Math.floor(this.time / 60);
    let seconds = this.time % 60;
    let minutesStr = minutes < 10 ? "0" + minutes : minutes;
    let secondsStr = seconds < 10 ? "0" + seconds : seconds;
    return `${minutesStr}:${secondsStr}`;
  }

  stop() {
    clearInterval(this.interval);
  }

  removeHtml() {
    this.el.remove();
  }
}




const ELEMENT_SIZE = 100;
const FREEZE_TIME = 4000;
let id = 0;

export class Element {
  constructor(className) {
    this.className = className;
    this.element = null;
    this.id = ++id;
  }

  getTopNumber(element) {
    let el = element || this.element;
    return parseInt(el.style.top.replace("px", ""));
  }
  getLeftNumber(element) {
    let el = element || this.element;
    return parseInt(el.style.left.replace("px", ""));
  }

  positionElementOnScreen() {
    this.element = document.createElement("div");
    this.element.classList.add("basket");

    let heightLim = document.body.clientHeight;
    let widthLim = document.body.clientWidth;

    let top = this.chooseRandomLocation(heightLim) + "px";
    let left = this.chooseRandomLocation(widthLim) + "px";

    this.element.style.top = top;
    this.element.style.left = left;
    this.element.style.display = "block";

    document.body.append(this.element);
  }
  chooseRandomLocation(sizeLimit) {
    let position = Math.floor(Math.random() * sizeLimit) - ELEMENT_SIZE;
    return position < 0 ? position + ELEMENT_SIZE : position;
  }
}
export class MovingElement extends Element {
  constructor(className, points) {
    super(className);
    this.move = false;
    this.points = points;
    this.frozen = false;
    this.timer = new Timer("timer", 0);
  }

  set move1(isMove) {
    this.move = isMove;
  }

  checkCollision(myTop, myLeft) {
    let basketElement = document.querySelector(".basket");
    let top = this.getTopNumber(basketElement);
    let bottom = top + ELEMENT_SIZE;
    let left = this.getLeftNumber(basketElement);
    let right = left + ELEMENT_SIZE;
    // console.log(top, bottom, left, right);

    let myRight = myLeft + ELEMENT_SIZE;
    let myBottom = myTop + ELEMENT_SIZE;
    // console.log(myTop, myBottom, myLeft, myRight);

    if (myTop > top && myTop < bottom && myLeft < right && myLeft > left) {
      return true;
    }
    if (myTop > top && myTop < bottom && myRight < right && myRight > left) {
      return true;
    }
    if (
      myBottom > top &&
      myBottom < bottom &&
      myRight < right &&
      myRight > left
    ) {
      return true;
    }
    if (
      myBottom > top &&
      myBottom < bottom &&
      myLeft < right &&
      myLeft > left
    ) {
      return true;
    }
  }

  // positionElementOnScreen() {
  //   this.element = document.createElement("div");
  //   this.element.classList.add("basket");

  //   let heightLim = document.body.clientHeight;
  //   let widthLim = document.body.clientWidth;

  //   let top = this.chooseRandomLocation(heightLim) + "px";
  //   let left = this.chooseRandomLocation(widthLim) + "px";

  //   this.element.style.top = top;
  //   this.element.style.left = left;
  //   this.element.style.display = "block";

  //   document.body.append(this.element);

  // }
  positionElementOnScreen() {
    this.element = document.createElement("div");
    this.element.classList.add("ball", this.className);
    let heightLim = document.body.clientHeight;
    let widthLim = document.body.clientWidth;
    let top, left;

    do {
      top = this.chooseRandomLocation(heightLim);
      left = this.chooseRandomLocation(widthLim);
    } while (this.checkCollision(top, left));

    this.element.style.top = top + "px";
    this.element.style.left = left + "px";
    this.element.style.display = "block";

    document.body.append(this.element);
  }

  freeze() {
    this.frozen = true;
    let xDiv = document.createElement("div");
    xDiv.classList.add("frozen");
    this.element.append(xDiv);

    setTimeout(() => {
      xDiv.classList.toggle("frozen");
      xDiv.remove();
      this.frozen = false;
      let timerDiv = this.timer.getHtml();
      this.element.append(timerDiv);
      this.timer.start(timerDiv);
    }, FREEZE_TIME);
  }

  updateElementLocation(e) {
    if (this.move) {
      this.element.style.top = e.clientY - ELEMENT_SIZE / 2 + "px";
      this.element.style.left = e.clientX - ELEMENT_SIZE / 2 + "px";

      let top = this.getTopNumber();
      let left = this.getLeftNumber();
      return { top, left };
    }
    return null;
  }
}


let scoreDiv = document.querySelector(".score");
let timerDiv = document.querySelector(".timer");
let pauseBtn = document.querySelector(".pauseBtn");
let intervalBall, checkWinInterval,intervalDoingNothing,ballIntervals =[]
let gameOn = false

let basket,
  timer,
  balls = [];
let score = 0;
scoreDiv.innerText = 0;

const TOTAL_TIME = 3 * 60;
const SCORE_TO_BIT = 10;
const TIME_LIM1 = 20;
const TIME_LIM2 = 30;
const TIME_LIM_A = 8;
const SECOND = 1000;
const CLASS_A = "ball-a";
const CLASS_B = "ball-b";
const INTERVAL_TIME_FOR_DOING_NOTHING = 8000;
let oldScore = 0;

startGame();
function startGame() {
  gameOn = true
  basket = new Element("basket");
  basket.positionElementOnScreen();

  timer = new Timer("timer", 0, timerDiv);
  timer.start(timerDiv)
  

  removeScoreForDoingNothing();
  checkWin()
  ballRotation(CLASS_A);
  ballRotation(CLASS_B);
}

function checkWin(){
  checkWinInterval = setInterval(() => {
    if (timer.time === TOTAL_TIME) {
      if (score >= SCORE_TO_BIT) {
        confirm("you won");
      } else {
        confirm("you lose");
      }
      clearInterval(checkWinInterval);
    }
})
}

pauseBtn.addEventListener("click",pauseResumeGame)

function pauseGame(){
    gameOn = !gameOn
    pauseBtn.innerText = gameOn?"Pause":"Start"
    timer.stop()
    // clearInterval(checkWinInterval)
    clearInterval(intervalDoingNothing)
    for (const intervalItem of ballIntervals) {
        clearInterval(intervalItem)
    }
    ballIntervals = []
    for (const ball of balls) {
        ball.timer.stop()
    }
}
function resumeGame(){
    gameOn = !gameOn
    pauseBtn.innerText = gameOn?"Pause":"Start"
    timer.start(timerDiv)
    
}
function pauseResumeGame(){
    if(gameOn){
        pauseGame()
    }else{
        resumeGame()
    }
 
    
}

function removeScoreForDoingNothing() {
   intervalDoingNothing = setInterval(() => {
    if (oldScore === score) {
      score -= 1;
      scoreDiv.innerText = score;
    } else {
      oldScore = score;
    }
  }, INTERVAL_TIME_FOR_DOING_NOTHING);
}
function ballRotation(className) {
  createBall(className);
  let rotationTime = className === CLASS_A ? TIME_LIM_A : getRandomNum();
  intervalBall = setInterval(() => {
    createBall(className);
    console.log(balls);
  }, rotationTime * SECOND);

  ballIntervals.push(intervalBall)
}

function createBall(className) {
  let points = className === CLASS_A ? 1 : 2;
  let ball = new MovingElement(className, points);
  ball.positionElementOnScreen();
  createEvents(ball);
  if (className === CLASS_A) {
    ball.freeze();
  }
  balls.push(ball);
}

// function startTime() {
//   timerDiv.innerText = timer.formatTimerTxt();
//   checkWinInterval = setInterval(() => {
//     if (timer.time === TOTAL_TIME) {
//       if (score >= SCORE_TO_BIT) {
//         confirm("you won");
//       } else {
//         confirm("you lose");
//       }
//       clearInterval(checkWinInterval);
//     }
//     timer.time += 1;
//     timerDiv.innerText = timer.formatTimerTxt();
//   }, SECOND);
// }

function getRandomNum() {
  return Math.floor(TIME_LIM1 + Math.random() * (TIME_LIM2 - TIME_LIM1));
}

function toggleGreen() {
  let counter = 0;
  let interval = setInterval(() => {
    counter++;
    basket.element.classList.toggle("green");
    if (counter === 6) {
      clearInterval(interval);
    }
  }, 150);
}

function removeBallFromList(id) {
  let filteredBallArr = balls.filter((ball) => ball.id !== id);
  balls = [...filteredBallArr];
  console.log("length : " + balls.length);
}

function updatePoints(ball) {
  if (ball.className === CLASS_A) {
    let tempBalls = balls.filter((b) => ball.id !== b.id);
    let findB = tempBalls.find((b) => b.className === CLASS_B);
    if (findB) {
      score -= 4;
    } else {
      if (ball.timer.time <= 4) {
        score += 1;
      } else {
        score -= 1;
      }
    }
  } else {
    score += 2;
  }
}

function handleMove(e, ball) {
  if (ball.move) {
    let { top, left } = ball.updateElementLocation(e);
    if (ball.checkCollision(top, left)) {
      updatePoints(ball);
      console.log("colission");
      ball.move1 = false;
      console.log(ball.move + " " + ball.className);

      toggleGreen();
      ball.element.remove();
      removeBallFromList(ball.id);
      console.log(balls);
      scoreDiv.innerText = score;
    }
  }
}
function createEvents(ball) {
  ball.element.addEventListener("mousedown", () => {
    if (!ball.frozen) {
      ball.move1 = true;
    }
    console.log(ball.move + " " + ball.className);
  });
  document.addEventListener("mousemove", (e) => handleMove(e, ball));
  ball.element.addEventListener("mouseup", () => {
    ball.move1 = false;
    console.log(ball.move + " " + ball.className);
  });
}
