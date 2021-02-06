import Timer from "./timer.js";
import { MovingElement, Element } from "./element.js";

let scoreDiv = document.querySelector(".score");
let timerDiv = document.querySelector(".timer");

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
const CLASS_A = "ball-a"
const CLASS_B = "ball-b"


startGame();
function startGame() {
  basket = new Element("basket");
  basket.positionElementOnScreen();

  timer = new Timer("timer", 0, timerDiv);
  startTime(timer);

  intervalBall(CLASS_A);
  intervalBall(CLASS_B);
}
function intervalBall(className) {
  createBall(className);
  let intervalTime = className === CLASS_A ? TIME_LIM_A : getRandomNum();
  setInterval(() => {
    createBall(className);
    console.log(balls);
  }, intervalTime * SECOND);
}

function createBall(className) {
  let points = className === CLASS_A ? 2 : 4;
  let ball = new MovingElement(className, points);
  ball.positionElementOnScreen();
  createEvents(ball);
  balls.push(ball);
}


function startTime() {
  let interval = setInterval(() => {
    if (timer.time === TOTAL_TIME) {
      if (score >= SCORE_TO_BIT) {
        confirm("you won");
      } else {
        confirm("you lose");
      }
      clearInterval(interval);
    }
    timer.time += 1;
    timerDiv.innerText = timer.formatTimerTxt();
  }, SECOND);
}

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

function handleMove(e, ball) {
  if (ball.move) {
    let { top, left } = ball.updateElementLocation(e);
    if (ball.checkCollision(top, left)) {
      console.log("colission");
      ball.move1 = false;
      console.log(ball.move + " " + ball.className);

      toggleGreen();
      ball.element.remove();
      removeBallFromList(ball.id);
      console.log(balls);
      score += ball.points;
      scoreDiv.innerText = score;
    }
  }
}
function createEvents(ball) {
  ball.element.addEventListener("mousedown", () => {
    ball.move1 = true;
    console.log(ball.move + " " + ball.className);
  });
  document.addEventListener("mousemove", (e) => handleMove(e, ball));
  ball.element.addEventListener("mouseup", () => {
    ball.move1 = false;
    console.log(ball.move + " " + ball.className);
  });
}
