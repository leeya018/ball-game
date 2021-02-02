class Element {
  constructor(className, width, height) {
    this.className = className;
    this.width = width;
    this.height = height;
  }
  showElement(){
    $(".container").append(`<div class=${this.className}>hello</div>`);
    $(`.${this.className}`).css({
      top:0,
      left:0,
      width: this.width + "px",
      height: this.height + "px",
      backgroundColor:"yellow"
    })

  }

}
class MovingElement extends Element {
  constructor(className,width,height, score) {
    super(className, width, height);
    this.score = score;
    this.timer = new Timer("small-timer", className, 4);
    this.enableElem = false;
    this.checkTimer();
  }

  checkTimer() {
    let inter = setInterval(() => {
      if (this.timer.getTime() === 1) {
        console.log("1");
        this.enableElem = true;
        clearInterval(inter);
      }
    }, 1000);
  }


  showElement() {
    this.createElement();
    this.positionElement();
    this.addHandlers();
    this.timer.startTime();
  }

  createElement() {
    $(".container").append(`<div class=${this.className}>hello</div>`);
    $(`.${this.className}`).css({
      width: this.width + "px",
      height: this.height + "px",
      backgroundColor: this.className === "a" ? "blue" : "red",
    });
    this.timer.createElement();
  }
  removeElement() {
    console.log("remove");
    $(`.${this.className}`).remove();
    this.timer.stopTime();
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
  }
  checkCollision(){
    let el = $(`.${this.className}`)
    let {left ,top } = el.position()
    if(left < 100 && top < 100 ){
      alert("collision")
    }
  }
  addHandlers() {
    let go = false;
    let self = this;
    let element = $(`.${this.className}`);
    element.mousedown(function (e) {
      console.log("mouse down");
      e.preventDefault();
      console.log(self.enableElem);
      if (self.enableElem) {
        go = true;
      }
    });
    $(document).mousemove(function (e) {
      if (go) {
        self.checkCollision()
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
    let { left, top } = $(`.${this.className}`).position();
    return { top, left };
  }
  getBorders() {
    let { left, top } = this.getPosition();
    return { top, left, right: left + width, bottom: top + height };
  }
  getMiddle() {
    let { left, top } = this.getPosition();
    return { x: this.width / 2 + left, y: this.height / 2 + top };
  }
}
