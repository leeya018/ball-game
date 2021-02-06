const ELEMENT_SIZE = 100;

export class Element {
  constructor(className) {
    this.className = className;
  }
  createElement() {
    console.log("create element parent ");
    let elementDiv = document.createElement("div");
    elementDiv.classList.add(this.className);

    let heightLim = document.body.clientHeight;
    let widthLim = document.body.clientWidth;

    let top = this.chooseRandomLocation(heightLim) + "px";
    let left = this.chooseRandomLocation(widthLim) + "px";

    elementDiv.style.top = top;
    elementDiv.style.left = left;

    return elementDiv;
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
  }

  checkCollision(myTop, myLeft) {
    let basketElement = document.querySelector(".basket");
    let top = parseInt(basketElement.style.top.replace("px", ""));
    let bottom = top + ELEMENT_SIZE;
    let left = parseInt(basketElement.style.left.replace("px", ""));
    let right = left + ELEMENT_SIZE;
    console.log(top, bottom, left, right);

    let myRight = myLeft + ELEMENT_SIZE;
    let myBottom = myTop + ELEMENT_SIZE;
    console.log(myTop, myBottom, myLeft, myRight);

    if (myTop >= top && myTop <= bottom && myLeft <= right && myLeft >= left) {
      alert("colission");
    }
    if (
      myTop >= top &&
      myTop <= bottom &&
      myRight <= right &&
      myRight >= left
    ) {
      alert("colission");
    }
    if (
      myBottom >= top &&
      myBottom <= bottom &&
      myRight <= right &&
      myRight >= left
    ) {
      alert("colission");
    }
    if (
      myBottom >= top &&
      myBottom <= bottom &&
      myLeft <= right &&
      myLeft >= left
    ) {
      alert("colission");
    }
  }
  createElement() {
    let elementDiv = document.createElement("div");
    elementDiv.classList.add(this.className);

    let heightLim = document.body.clientHeight;
    let widthLim = document.body.clientWidth;
    let top, left;

    do {
      top = this.chooseRandomLocation(heightLim);
      left = this.chooseRandomLocation(widthLim);
    } while (this.checkCollision(top, left));

    elementDiv.style.top = top + "px";
    elementDiv.style.left = left + "px";

    return elementDiv;
  }

  createEvents(element) {
    let updateElementLocation = this.updateElementLocation.bind(this);

    element.addEventListener("mousedown", () => {
      this.move = true;
    });
    document.addEventListener("mousemove", updateElementLocation);
    element.addEventListener("mouseup", () => {
      this.move = false;
    });
  }
  updateElementLocation(e) {
    if (this.move) {
      let elementDiv = document.querySelector(`.${this.className}`);
      elementDiv.style.top = e.clientY + "px";
      elementDiv.style.left = e.clientX + "px";
    }
  }
}
