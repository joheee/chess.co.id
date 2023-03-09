import { Piece } from "./Piece.js";

export class Pawn extends Piece {
    constructor(isCaptured,piecePosition,isWhite,pawnValue,elementId){
        super(isCaptured, piecePosition, isWhite, elementId)
        this.pawnValue = pawnValue
    }
    PieceMove() {
        console.log('this is pawn with piece move')
    }
}