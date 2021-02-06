import Timer from "./timer.js";
import { MovingElement, Element } from "./element.js";

// let timer = new Timer("timer",0)
// let timerSpan = timer.createHtml()
// document.querySelector("body").append(timerSpan)
// timer.start()

let basket = new Element("basket");
let basketElem = basket.createElement();
document.querySelector("body").append(basketElem);

let a = new MovingElement("ball", 2);
let element = a.createElement();
a.createEvents(element);
document.querySelector("body").append(element);
