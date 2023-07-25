import { Piece } from "./Piece.js";

export class King extends Piece {
    constructor(isCaptured,piecePosition,isWhite,elementId){
        super(isCaptured, piecePosition, isWhite, elementId)
        this.pawnValue = 0
        this.MovementListener()
    }
    MovementMechanism = () => {

    }  
    ValidMoves = (dest) => {
        console.log(this.piecePosition, dest)
        return true
    }

    MovementMechanism = () => {
        if (this.ClickedPiece()) {
            console.log(this)
        } else {
            console.log('This piece is not selected')
        }
    }
}