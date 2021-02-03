class Game {
  constructor() {
    this.points = 0;
    this.updatePointsCallback = this.updatePointsCallback.bind(this)
    this.basket = new Element("basket", 100, 100);
    this.ball = new MovingElement("a", 100, 100, 1,this.updatePointsCallback);
    this.timer = new Timer("big-timer", "container", 0);
}

updatePointsCallback(score){
    this.points += score
    $(`.score`).text("Your score is :" + this.points)

}
showScoreOnScreen(){
    $(`.container`).append(`<span class="score">Your Score: ${this.points } </span>`)
    
}

startGame() {
    this.showScoreOnScreen()
    console.log("new points : " + this.points)
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
