import { Variable } from "../config/Variable.js"

export class Tile {
    constructor(tilePosition) {
        this.tilePosition = tilePosition
    }
    
    DefaultBackground() {
        const i = parseInt(this.tilePosition[0])
        const j = parseInt(this.tilePosition[1])
        document.getElementById(this.tilePosition).style.backgroundColor = i % 2 === 0 ?
        j % 2 === 0 ? Variable.firstTile : Variable.secondTile :
        j % 2 !== 0 ? Variable.firstTile : Variable.secondTile
    }

    
}