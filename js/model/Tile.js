import { Variable } from "../config/Variable.js"
import { KingController } from "../controller/KingController.js"

export class Tile {
    constructor(tilePosition) {
        this.tilePosition = tilePosition
    }

    static GetXYTile(dot) {
        let arr = []
        let xSrc = dot % 10
        let ySrc = (dot - xSrc) / 10
        arr.push(ySrc)
        arr.push(xSrc)
        return arr
    }

    static ArrangeGrid(x,y){
        return y * 10 + x
    }

    static CalculateBackground(elementId) {
        const i = parseInt(elementId[0])
        const j = parseInt(elementId[1])
        return i % 2 === 0 ?
        j % 2 === 0 ? Variable.firstTile : Variable.secondTile :
        j % 2 !== 0 ? Variable.firstTile : Variable.secondTile
    }

    static ResetBackground(){
        for(let i=1;i<=8;i++) {
            for(let j=1;j<=8;j++){
                let tile = new Tile(`${i}${j}`)
                tile.DefaultBackground()
            }
        }
        KingController.HandleKingStatus()
    }

    static ResetHintBackground(){
        const hintElements = document.querySelectorAll('.hint-movement');
        hintElements.forEach((element) => {
        element.remove();
        });
    }

    static HintBackground(id) {
        const hintDiv = document.createElement('div')
        hintDiv.setAttribute('class', 'hint-movement')
        const tile = document.getElementById(id)
        tile.appendChild(hintDiv)
    }

    DefaultBackground() {
        const i = parseInt(this.tilePosition[0])
        const j = parseInt(this.tilePosition[1])
        document.getElementById(this.tilePosition).style.borderRadius = '0'
        document.getElementById(this.tilePosition).style.backgroundColor = i % 2 === 0 ?
        j % 2 === 0 ? Variable.firstTile : Variable.secondTile :
        j % 2 !== 0 ? Variable.firstTile : Variable.secondTile
    }
}