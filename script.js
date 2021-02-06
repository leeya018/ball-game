import Timer from "./timer.js";
import { MovingElement, Element } from "./element.js";

let scoreDiv = document.querySelector(".score");
let ballDiv = document.querySelector(".ball");
let basketDiv = document.querySelector(".basket");

let basket = new Element("basket", basketDiv);
basket.positionElementOnScreen();

let ballA = new MovingElement("ball", ballDiv, 2);
ballA.positionElementOnScreen();
createEvents(ballA);

scoreDiv.innerText = 0;

let score = 0;

function countToShow() {
  setTimeout(() => {
    ballA.positionElementOnScreen()
  }, 2000);
}

function toggleGreen(){
    let counter = 0 
    let interval = setInterval(() => {
        counter++
        basketDiv.classList.toggle("green")
        if(counter === 6){
            clearInterval(interval)
        }
    }, 150)
    

}

function handleMove(e,ball) {
  if (ball.move) {
    let { top, left } = ball.updateElementLocation(e);
    console.log(left, top);
    if (ball.checkCollision(top, left)) {
        console.log("colission")
      ball.move1 = false;
        toggleGreen()
      ballDiv.style.display = "none";
      score += ball.points;
      scoreDiv.innerText = score;
      countToShow();
    }
  }
}
function createEvents(ball) {
  ballDiv.addEventListener("mousedown", () => {
    ball.move1 = true;
  });
  document.addEventListener("mousemove", (e)=>handleMove(e,ball));
  ballDiv.addEventListener("mouseup", () => {
    ball.move1 = false;
  });
}
// let timer = new Timer("timer",0)
// let timerSpan = timer.createHtml()
// document.querySelector("body").append(timerSpan)
// timer.start()
