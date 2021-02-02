class Timer {
  constructor() {
    this.time = 0;
    this.interval;
  }

  getTime() {
    var minutes = Math.floor(this.time / 60);
    var seconds = this.time - minutes * 60;
    return `${minutes}:${seconds}`;
  }
  startTime() {
    this.interval = setInterval(() => {
      this.time += 1;
    }, 1000);
  }
  stopTime() {
    clearInterval(this.interval);
  }
}

function wait(){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve()
          }, 2000);

    })
}

let t = new Timer();
t.startTime();
console.log(t.getTime());
 wait().then(()=>{
     console.log(t.getTime());

 }).then(()=>{
     t.stopTime()
     wait().then(()=>{
         console.log(t.getTime())
     })
 })
