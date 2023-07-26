import { BlackClock, WhiteClock } from "../index.js"
import { Variable } from "../config/Variable.js"

export class GameStateController {
    static DictateTurn(){

    }

    static DefineClock(){
        console.log(Variable.isWhiteMove ? 'putih lagi' : 'hitam lagi')
        WhiteClock.ClockMechanism(Variable.isWhiteMove)
        BlackClock.ClockMechanism(!Variable.isWhiteMove)
    }
}