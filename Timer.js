class Timer {
  constructor(className, parentClass, startTime) {
    this.direction = startTime === 0 ? "forward" : "backward";
    this.time = startTime;
    this.interval;
    this.className = className;
    this.parentClass = parentClass;
  }
  createElement(top = 0, left = 100) {
    $(`.${this.parentClass}`).append(`<span class=${this.className}></span>`);
    $(`.${this.className}`).css({
      position: "absolute",
      top: top + "px",
      left: left + "px",
      width: "60px",
      height: "20px",
      border: "1px solid black",
    });
  }

  getTime() {
    return this.time;
  }
  getTimeStr() {
    var minutes = Math.floor(this.time / 60);
    var seconds = this.time - minutes * 60;
    return `${minutes}:${seconds}`;
  }
  startTime() {
    $(`.${this.className}`).text(this.getTimeStr());
    if (this.direction === "forward") {
      this.countForward();
    } else {
      this.countBackward();
    }
  }

  countForward() {
    this.time += 1;
    this.interval = setInterval(() => {
      $(`.${this.className}`).text(this.getTimeStr());
      this.time += 1;
    }, 1000);
  }

  countBackward() {
    this.time -= 1;
    this.interval = setInterval(() => {
      $(`.${this.className}`).text(this.getTimeStr());
      this.time -= 1;
      if (this.time === 0) {
        this.stopTime();
        $(`.${this.className}`).remove();
      }
    }, 1000);
  }
  stopTime() {
    clearInterval(this.interval);
  }
}

function wait() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}

// let t = new Timer();
// t.startTime();
// console.log(t.getTime());
//  wait().then(()=>{
//      console.log(t.getTime());

//  }).then(()=>{
//      t.stopTime()
//      wait().then(()=>{
//          console.log(t.getTime())
//      })
//  })
