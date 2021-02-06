export class Timer {
  constructor(className, time, el) {
    this.time = time;
    this.className = className;
    this.interval = null;
    this.el = el;
  }
  start(div) {
    div.innerText = this.formatTimerTxt();
    this.interval = setInterval(() => {
      this.time += 1;
      div.innerText = this.formatTimerTxt();
    }, 1000);
  }
  getHtml() {
    let timerDiv = document.createElement("div");
    timerDiv.classList.add(this.className, "timer-el");
    return timerDiv;
  }
  reset() {
    this.time = 0;
  }

  formatTimerTxt() {
    let minutes = Math.floor(this.time / 60);
    let seconds = this.time % 60;
    let minutesStr = minutes < 10 ? "0" + minutes : minutes;
    let secondsStr = seconds < 10 ? "0" + seconds : seconds;
    return `${minutesStr}:${secondsStr}`;
  }

  stop() {
    clearInterval(this.interval);
  }

  removeHtml() {
    this.el.remove();
  }
}
