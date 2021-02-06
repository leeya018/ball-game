export  class TimerEl{
    constructor(){
        this.time = 0 
    }   
    start(){
        setInterval(() => {
            this.time += 1
        }, 1000)
        
    }
}


export class Timer{
    constructor(className,time,el){
        this.time = time
        this.className = className
        this.interval = null
        this.el = el
        
    }
    reset(){
        this.time = 0 
    }
    
    formatTimerTxt(){
        let minutes = Math.floor(this.time / 60);
        let seconds = this.time % 60;
        let minutesStr = minutes<10 ? '0'+minutes:minutes
        let secondsStr = seconds<10 ? '0'+seconds:seconds
        return `${minutesStr}:${secondsStr}`
    }
    updateTime(){
        this.time  += 1 
        let timeSpan = this.el
        timeSpan.innerText = this.formatTimerTxt()
        console.log(this.time)
    }
    stop(){
        clearInterval(this.interval) 
    }
    
    removeHtml(){
        this.el.remove()
    }
}