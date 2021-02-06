const ELEMENT_SIZE = 100;

export class Element {
  constructor(className,element) {
    this.className = className;
    this.element = element
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
    let heightLim = document.body.clientHeight;
    let widthLim = document.body.clientWidth;

    let top = this.chooseRandomLocation(heightLim) + "px";
    let left = this.chooseRandomLocation(widthLim) + "px";

    this.element.style.top = top;
    this.element.style.left = left;
    this.element.style.display = "block"


  }
  chooseRandomLocation(sizeLimit) {
    let position = Math.floor(Math.random() * sizeLimit) - ELEMENT_SIZE;
    return position < 0 ? position + ELEMENT_SIZE : position;
  }
}
export class MovingElement extends Element {
  constructor(className, element,points,) {
    super(className,element);
    this.move = false;
    this.points = points;
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
