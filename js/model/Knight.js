import { Piece } from "./Piece.js";

export class Knight extends Piece {
    constructor(isCaptured,piecePosition,isWhite,elementId){
        super(isCaptured, piecePosition, isWhite, elementId)
        this.pawnValue = 3
        this.MovementListener()
    }
    MovementMechanism = () => {
        console.log(this)

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