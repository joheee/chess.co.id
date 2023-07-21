import { LocalStorage } from "../navigation/LocalStorage.js"

export class Time {
    constructor() {
        let local = new LocalStorage()
        this.time = local.GetTime()
        this.countdownInterval = null
        this.countdownActive = false
    }

    DisplayClock(isStart, id) {
        let time = this.time
        let clock = document.getElementById(id)
        clock.innerHTML = `${time}:00`

        if(isStart) this.startCountdown(id)
        else this.stopCountdown()
    }

    startCountdown(id) {
        if (!this.countdownActive) {
            this.countdownActive = true;
            const countdownElement = document.getElementById(id);
            let timeRemaining = this.convertTimeToSeconds(countdownElement.textContent);
        
            this.countdownInterval = setInterval(() => {
                if (timeRemaining > 0) {
                    timeRemaining--;
                    const formattedTime = this.formatTimeFromSeconds(timeRemaining);
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