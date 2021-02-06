import Timer from "./timer.js";
import { MovingElement, Element } from "./element.js";

let scoreDiv = document.querySelector(".score")
scoreDiv.innerText = 0

let score = 0;

function handleMove(element, ball,e) {
   
  if (ball.move) {

    let { top, left } = ball.updateElementLocation(e);
    console.log(left,top)
    if (ball.checkCollision(top, left)) {
        ball.move1 = false
      let basket = document.querySelector(`.basket`);
      basket.style.backgroundColor = "green";

      element.style.display = "none"
      score += ball.points
      scoreDiv.innerText = score
    }
  }
}
function createEvents(element, ball) {
  element.addEventListener("mousedown", () => {
    ball.move1 = true;
  });
  document.addEventListener("mousemove", (e)=>handleMove(element, ball,e));
  element.addEventListener("mouseup", () => {
    ball.move1 = false;
  });
}
// let timer = new Timer("timer",0)
// let timerSpan = timer.createHtml()
// document.querySelector("body").append(timerSpan)
// timer.start()

let basket = new Element("basket");
let basketElem = basket.createElement();
document.querySelector("body").append(basketElem);

let a = new MovingElement("ball", 2);
let element = a.createElement();
// a.createEvents(element);
createEvents(element, a);
document.querySelector("body").append(element);

