import { Piece } from "./Piece.js";

export class Pawn extends Piece {
    constructor(isCaptured,piecePosition,isWhite,elementId){
        super(isCaptured, piecePosition, isWhite, elementId)
        this.pawnValue = 1
        this.MovementListener()
    }
    MovementMechanism = () => {
        console.log(this.pawnValue)
    }
    
}