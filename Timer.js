
export default class Timer{
    constructor(className,time){
        this.time = time
        this.className = className
        this.interval = null
        
    }
    start(){
        let updateTime = this.updateTime.bind(this)
        this.interval = setInterval(updateTime,1000)
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
        let timeSpan = this.getHtml()
        timeSpan.innerText = this.formatTimerTxt()
        console.log(this.time)
    }
    stop(){
        clearInterval(this.interval) 
    }
    getHtml(){
        return document.querySelector(`.${this.className}`)
    }
    createHtml(){
        let timerSpan = document.createElement("span")
        timerSpan.classList.add(this.className)
        timerSpan.innerText = this.formatTimerTxt()
        return timerSpan

    }
    
    removeHtml(){
        let timerSpan = document.querySelector(`.${this.className}`)
        timerSpan.remove()
    }
}