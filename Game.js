class Game { 
    constructor(){
        this.basket = new Element("basket",100,100)
        this.ball = new MovingElement("a",100,100,1);
        this.timer = new Timer("big-timer","container",0)
        this.points = 0 
    }

    startGame(){
        this.basket.showElement()
        this.ball.showElement()
        this.timer.createElement(100,0)
        this.timer.startTime()
        // this.checkCollisionInterval()
    }

}