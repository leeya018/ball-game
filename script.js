import { Timer } from "./timer.js";
import { MovingElement, Element } from "./element.js";

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
    clearInterval(checkWinInterval)
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
