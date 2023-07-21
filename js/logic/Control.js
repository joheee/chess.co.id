import { LocalStorage } from "../navigation/LocalStorage.js"

export function Index(i) {
    return i-1
}

export class Time {
    constructor() {
        let local = new LocalStorage()
        this.time = local.GetTime()
    }

    DisplayClock(isStart, id) {
        let time = this.time
        let clock = document.getElementById(id)
        if(isStart) {
            clock.innerHTML = time
        }
    }

}