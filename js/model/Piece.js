export class Piece {
    constructor(isCaptured, piecePosition, isWhite, elementId){
        this.isCaptured = isCaptured
        this.piecePosition = piecePosition
        this.isWhite = isWhite
        this.elementId = elementId
        this.ValidateCaptured()
    }
    MovementMechanism = () => {}
    MovementListener = () => document.getElementById(this.elementId).addEventListener('click', this.MovementMechanism)

    ValidateCaptured() {
        if(this.isCaptured) document.getElementById(this.elementId).style.display = 'none'
        else document.getElementById(this.elementId).style.display = 'block'
    }
}