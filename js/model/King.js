import { Piece } from "./Piece.js";

export class King extends Piece {
    constructor(isCaptured,piecePosition,isWhite,elementId){
        super(isCaptured, piecePosition, isWhite, elementId)
        this.pawnValue = 0
        this.MovementListener()
    }
    MovementMechanism = () => {
        console.log(this)
    }
}