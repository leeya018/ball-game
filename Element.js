class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Element {
  constructor(score, className) {
    this.className = className
    this.width = 100;
    this.height = 100;
    this.score = score;
    this.position =null
  }

  showElement(){
    this.createElement()
    this.position = this.positionElement()
    this.addHandlers()
  }

  createElement() {
    $(".container").append(`<div class=${this.className}>hello</div>`);
    $(`.${this.className}`).css({
      width: this.width + "px",
      height: this.height + "px",
      backgroundColor: this.className === "a" ? "blue" : "red",
    });
  }
  positionElement() {
    const screenWidth = 1536;
    const screenHeight = 864;
    let randX = Math.random() * (screenWidth - this.width);
    let randY = Math.random() * (screenHeight - this.height);
    $(`.${this.className}`).css({
      position: "absolute",
      top: randY,
      left: randX,
    });

    return new Position(randX, randY);
  }

  addHandlers() {
    let go = false;
    let element = $(`.${this.className}`)
    element.mousedown(function (e) {
      console.log("mouse down")
      e.preventDefault();
      go = true;
    });
    $(document).mousemove(function (e) {
      if (go) {
        element.css({
          position: "absolute",
          top: e.pageY - element.height() / 2,
          left: e.pageX - element.width() / 2,
        });
      }
    });

    $(document).mouseup(function () {
      go = false;
      element.off("mousemove");
    });
  }

  getScore() {
    return this.score;
  }
  getPosition() {
    let { x, y } = this.position;
    return { x, y };
  }
  getMiddle() {
    let { x, y } = this.position;
    return { x: this.width / 2 + x, y: this.height / 2 + y };
  }
}

// let e = new Element( 1);
// console.log(e.getPosition());
// console.log(e.getMiddle());
