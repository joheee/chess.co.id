import { Piece } from "./Piece.js";

export class Rook extends Piece {
    constructor(isCaptured,piecePosition,isWhite,elementId){
        super(isCaptured, piecePosition, isWhite, elementId)
        this.pawnValue = 5
        this.MovementListener()
    }
    MovementMechanism = () => {
        console.log(this.pawnValue)
    }
}