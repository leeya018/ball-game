class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Element {
  constructor(width, height, score) {
    this.position = null;
    this.width = width;
    this.height = height;
    this.score = score;
  }
  calculateRandomPosition() {
    const screenWidth = 1536;
    const screenHeight = 864;

    let randX = Math.random() * (screenWidth - this.width);
    let randY = Math.random() * (screenHeight - this.height);
    this.position = new Position(randX, randY);
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

let e = new Element(100, 100, 1);
e.calculateRandomPosition();
console.log(e.getPosition());
console.log(e.getMiddle());
