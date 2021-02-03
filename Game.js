class Game {
  constructor() {
    this.score = 0;
    this.updateScoreCallback = this.updateScoreCallback.bind(this);
    this.basket = new Element("basket", 100, 100);
    // this.ball = new MovingElement("a", 100, 100, 1, this.updateScoreCallback);
    this.balls = []
    this.timer = new Timer("big-timer", "container", 0);

  }

  operation() {

    this.showScoreOnScreen();
    console.log("new points : " + this.points);
    this.basket.showElement();
    this.timer.createElement(100, 0);
    this.timer.startTime();

    this.ballA = new MovingElement("a", 100, 100, 1, this.updateScoreCallback);
    this.ballA.showElement();
    this.monitorGame();// check if you are winning 
  }

//   this.ballA.collide - hoiw can I know if its A ball or B ball ?
    if (this.ballA.collide()) {
      if (this.timer.getTimer() > 0) {
          this.score += this.ball.getPoints()
        this.basket.toggleGreen();
      }
      this.ball.remove();
      setTimeout(() => {
        this.ballA = new MovingElement("a", 100, 100, 1, this.updateScoreCallback);
        this.ballA.showElement();
      }, 8)
      
    }

    setInterval(() => {
        this.ballB = new MovingElement("b", 100, 100, 1, this.updateScoreCallback);
        this.ballB.showElement();
    }, randomTime(20,30))
    
  }
  updateScoreCallback(points) {
    this.score += points;
    $(`.score`).text("Your score is :" + this.score);
  }
  showScoreOnScreen() {
    $(`.container`).append(
      `<span class="score">Your Score: ${this.score} </span>`
    );
  }

  startGame() {
    this.showScoreOnScreen();
    console.log("new points : " + this.points);
    this.basket.showElement();
    this.ball.showElement();
    this.timer.createElement(100, 0);
    this.timer.startTime();
    this.monitorGame();
  }

  monitorGame() {
    setInterval(() => {
      if (this.timer.getTime() === 3 * 60) {
        if (this.points === 10) {
          alert("YOU WIN");
        } else {
          alert("YOU LOSE");
        }
      }
    }, 1000);
  }
}
