import { LocalStorage } from "../navigation/LocalStorage.js"

export class Time {
    constructor(id) {
        let local = new LocalStorage()
        this.time = local.GetTime()
        this.countdownInterval = null
        this.countdownActive = false
        this.timeRemaining  = 0
        this.id = id        
    }

    DisplayClock() {
        let time = this.time < 10 ? `0${this.time}` : this.time
        let clock = document.getElementById(this.id)
        clock.textContent = `${time}:00`
    }
    
    ClockMechanism(isStart) {
        if(isStart) {
            this.startCountdown(this.id)
        }
        else {
            this.startCountdown(this.id)
            this.stopCountdown(this.id)
        }
    }

    startCountdown() {
        if (!this.countdownActive) {
            this.countdownActive = true;
            const countdownElement = document.getElementById(this.id);
            this.timeRemaining = this.convertTimeToSeconds(countdownElement.textContent);
        
            this.countdownInterval = setInterval(() => {
                if (this.timeRemaining > 0) {
                    this.timeRemaining--;
                    this.lastTime = this.timeRemaining
                    const formattedTime = this.formatTimeFromSeconds(this.timeRemaining);
                    countdownElement.textContent = formattedTime;
                } else {
                    clearInterval(this.countdownInterval);
                    this.countdownActive = false;
                }
            }, 1000);
        }
    }
    
    stopCountdown() {
        clearInterval(this.countdownInterval);
        this.countdownActive = false;
      
        // Update the displayed time with the last time
        const countdownElement = document.getElementById(this.id);
        const formattedTime = this.formatTimeFromSeconds(this.timeRemaining);
        countdownElement.textContent = formattedTime;
      }
      
    convertTimeToSeconds(timeString) {
        const [minutes, seconds] = timeString.split(":").map(Number);
        return minutes * 60 + seconds;
    }
      
    formatTimeFromSeconds(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

}