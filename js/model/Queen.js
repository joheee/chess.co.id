import { Piece } from "./Piece.js";

export class Queen extends Piece {
    constructor(isCaptured,piecePosition,isWhite,elementId){
        super(isCaptured, piecePosition, isWhite, elementId)
        this.pawnValue = 9
        this.MovementListener()
    }
    MovementMechanism = () => {
        console.log(this)
    }
}