import { Variable } from "../config/Variable.js"
import { Tile } from "./Tile.js"

export class Piece {
    constructor(isCaptured, piecePosition, isWhite, elementId){
        this.isCaptured = isCaptured
        this.piecePosition = piecePosition
        this.isWhite = isWhite
        this.elementId = elementId
        this.isClicked = false
        this.ValidateCaptured()
    }

    ClickedPiece = () => {
        const imageElement = document.getElementById(this.elementId)
        const parentElement = imageElement.closest(Variable.tileClass)

        if(!this.isClicked && !Variable.isClickedPiece) {
            parentElement.style.backgroundColor = Variable.clickedTile
            this.isClicked = true
            Variable.isClickedPiece = true
        } else if(this.isClicked && Variable.isClickedPiece) {
            parentElement.style.backgroundColor = Tile.CalculateBackground(parentElement.id)
            this.isClicked = false
            Variable.isClickedPiece = false
        }
    }
    
    MovementListener = () => {
        document.getElementById(this.elementId).addEventListener('click', this.MovementMechanism)
        document.getElementById(this.elementId).addEventListener('dragstart', () => {
            console.log(this)
        })
    }
    
    MovementMechanism = () => {}

    ValidateCaptured() {
        if(this.isCaptured) document.getElementById(this.elementId).style.display = 'none'
        else document.getElementById(this.elementId).style.display = 'block'
    }
}