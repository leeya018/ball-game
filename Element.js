const ELEMENT_SIZE = 100;

export default class Element {
  constructor(className) {
    this.className = className;
    this.move = false;
  }
  createEvents(element) {
    let updateElementLocation = this.updateElementLocation.bind(this);

    element.addEventListener("mousedown", () => {this.move = true});
    document.addEventListener("mousemove", updateElementLocation);
    element.addEventListener("mouseup", () => {this.move = false});
  }
  updateElementLocation(e) {
    if (this.move) {
      let elementDiv = document.querySelector(`.${this.className}`);
      elementDiv.style.top = e.clientY + "px";
      elementDiv.style.left = e.clientX + "px";
    }
  }

  createElement() {
    let elementDiv = document.createElement("div");
    this.createEvents(elementDiv);
    elementDiv.classList.add(this.className);
    let heightLim = document.body.clientHeight;
    let widthLim = document.body.clientWidth;

    elementDiv.style.top = this.randomLocation(heightLim);
    elementDiv.style.left = this.randomLocation(widthLim);

    return elementDiv;
  }
  randomLocation(sizeLimit) {
    return Math.floor(Math.random() * sizeLimit) - ELEMENT_SIZE + "px";
  }
}
