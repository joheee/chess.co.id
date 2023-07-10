import { Variable } from "../config/Variable.js"

export class Tile {
    constructor(tilePosition) {
        this.tilePosition = tilePosition
    }
    
    static CalculateBackground(elementId) {
        const i = parseInt(elementId[0])
        const j = parseInt(elementId[1])
        return i % 2 === 0 ?
        j % 2 === 0 ? Variable.firstTile : Variable.secondTile :
        j % 2 !== 0 ? Variable.firstTile : Variable.secondTile
    }

    DefaultBackground() {
        const i = parseInt(this.tilePosition[0])
        const j = parseInt(this.tilePosition[1])
        document.getElementById(this.tilePosition).style.backgroundColor = i % 2 === 0 ?
        j % 2 === 0 ? Variable.firstTile : Variable.secondTile :
        j % 2 !== 0 ? Variable.firstTile : Variable.secondTile
    }
}