import Timer from "./timer.js";
import { MovingElement, Element } from "./element.js";

let scoreDiv = document.querySelector(".score");
let ballDivA = document.querySelector(".ball-a");
let ballDivB = document.querySelector(".ball-b");
let timerDiv = document.querySelector(".timer");
let basketDiv = document.querySelector(".basket");

let basket, ballA, ballB, timer;

let score = 0;
scoreDiv.innerText = 0;

const TOTAL_TIME = 3 * 60;
const SCORE_TO_BIT = 10;

startGame();
function startGame() {
  basket = new Element("basket", basketDiv);
  basket.positionElementOnScreen();

  ballA = new MovingElement("ball-a", ballDivA, 2);
  ballA.positionElementOnScreen();
  createEvents(ballA, ballDivA);

  ballB = new MovingElement("ball-b", ballDivB, 4);
  createEvents(ballB, ballDivB);

  timer = new Timer("timer", 0, timerDiv);
  startTime(timer);
  
  countToShowB();
}
function resetGame() {
    timer = null 
    ballA = null
    ballB = null
    basket = null
    points = 0 
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
    //   resetGame();
    //   startGame()
    }
    timer.time += 1;
    timerDiv.innerText = timer.formatTimerTxt();
    console.log(timer.time);
  }, 1000);
}


function countToShowB() {
  setInterval(() => {
    if (ballDivB.style.display !== "block") {
      ballB.positionElementOnScreen();
    }
  }, 1000);
}

function countToShow(ball) {
  setTimeout(() => {
    if (ball.className === "ball-a") {
      ball.positionElementOnScreen();
    }
  }, 2000);
}

function toggleGreen() {
  let counter = 0;
  let interval = setInterval(() => {
    counter++;
    basketDiv.classList.toggle("green");
    if (counter === 6) {
      clearInterval(interval);
    }
  }, 150);
}

function handleMove(e, ball, ballDiv) {
  if (ball.move) {
    let { top, left } = ball.updateElementLocation(e);
    // console.log(left, top);
    if (ball.checkCollision(top, left)) {
      console.log("colission");
      ball.move1 = false;
      console.log(ball.move + " " + ball.className);

      toggleGreen();
      ballDiv.style.display = "none";
      score += ball.points;
      scoreDiv.innerText = score;
      countToShow(ball);
    }
  }
}
function createEvents(ball, ballDiv) {
  ballDiv.addEventListener("mousedown", () => {
    ball.move1 = true;
    console.log(ball.move + " " + ball.className);
  });
  document.addEventListener("mousemove", (e) => handleMove(e, ball, ballDiv));
  ballDiv.addEventListener("mouseup", () => {
    ball.move1 = false;
    console.log(ball.move + " " + ball.className);
  });
}
