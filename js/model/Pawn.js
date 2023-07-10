import { Piece } from "./Piece.js";

export class Pawn extends Piece {

    constructor(isCaptured,piecePosition,isWhite,elementId){
        super(isCaptured, piecePosition, isWhite, elementId)
        this.pawnValue = 1
        this.isFirstMove = false
        this.MovementListener()
    }
    
    MovementMechanism = () => {
        if (this.ClickedPiece()) {
            console.log(this)
        } else {
            console.log('This piece is not selected')
        }
    }
}
