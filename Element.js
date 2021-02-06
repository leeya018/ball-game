const ELEMENT_SIZE = 100;
const FREEZE_TIME  = 4000
let id = 0

export class Element {
  constructor(className) {
    this.className = className;
    this.element = null
    this.id = ++id 
  }
  
  getTopNumber(element){
    let el = element || this.element
    return parseInt(el.style.top.replace("px", "")) 
  }
  getLeftNumber(element){
    let el = element || this.element
    return parseInt(el.style.left.replace("px", ""));
  }

  positionElementOnScreen() {
    this.element = document.createElement("div")
    this.element.classList.add("basket")

    let heightLim = document.body.clientHeight;
    let widthLim = document.body.clientWidth;

    let top = this.chooseRandomLocation(heightLim) + "px";
    let left = this.chooseRandomLocation(widthLim) + "px";

    this.element.style.top = top;
    this.element.style.left = left;
    this.element.style.display = "block"
    
    document.body.append(this.element)


  }
  chooseRandomLocation(sizeLimit) {
    let position = Math.floor(Math.random() * sizeLimit) - ELEMENT_SIZE;
    return position < 0 ? position + ELEMENT_SIZE : position;
  }
}
export class MovingElement extends Element {
  constructor(className,points) {
    super(className);
    this.move = false;
    this.points = points;
    this.frozen = false
  }

  set move1(isMove){
    this.move = isMove
  }

  checkCollision(myTop, myLeft) {
    let basketElement = document.querySelector(".basket");
    let top = this.getTopNumber(basketElement)
    let bottom = top + ELEMENT_SIZE;
    let left = this.getLeftNumber(basketElement)
    let right = left + ELEMENT_SIZE;
    // console.log(top, bottom, left, right);

    let myRight = myLeft + ELEMENT_SIZE;
    let myBottom = myTop + ELEMENT_SIZE;
    // console.log(myTop, myBottom, myLeft, myRight);

    if (myTop > top && myTop < bottom && myLeft < right && myLeft > left) {
      return true
    }
    if (
      myTop > top &&
      myTop < bottom &&
      myRight < right &&
      myRight > left
    ) {
      return true
    }
    if (
      myBottom > top &&
      myBottom < bottom &&
      myRight < right &&
      myRight > left
    ) {
      return true
    }
    if (
      myBottom > top &&
      myBottom < bottom &&
      myLeft < right &&
      myLeft > left
    ) {
      return true
    }
  }
  positionElementOnScreen() {
    this.element = document.createElement("div")
    this.element.classList.add("ball",this.className)
    let heightLim = document.body.clientHeight;
    let widthLim = document.body.clientWidth;
    let top, left;
    
    do {
      top = this.chooseRandomLocation(heightLim);
      left = this.chooseRandomLocation(widthLim);
    } while (this.checkCollision(top, left));
    
    this.element.style.top = top + "px";
    this.element.style.left = left + "px";
    this.element.style.display = "block"

    document.body.append(this.element)
    
  }

  freeze(){
    this.frozen = true
    let xDiv = document.createElement("div")
    xDiv.classList.add("frozen")
    this.element.append(xDiv)
    setTimeout(() => {
      xDiv.classList.toggle("frozen")
      xDiv.remove()
      this.frozen = false      
    }, FREEZE_TIME)
    
  }  

  updateElementLocation(e) {
    if (this.move) {
      this.element.style.top = e.clientY -ELEMENT_SIZE/2 + "px";
      this.element.style.left = e.clientX -ELEMENT_SIZE/2 + "px";
      
      let top = this.getTopNumber()
      let left = this.getLeftNumber()
      return {top,left}
    }
    return null
  }
}
