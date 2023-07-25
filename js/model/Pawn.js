import { PieceController } from "../controller/PieceController.js";
import { TileController } from "../controller/TileController.js";
import { Piece } from "./Piece.js";
import { Tile } from "./Tile.js";

export class Pawn extends Piece {

    constructor(isCaptured,piecePosition,isWhite,elementId){
        super(isCaptured, piecePosition, isWhite, elementId)
        this.pawnValue = 1
        this.isFirstMove = false
        this.MovementListener()
    }
    
    ValidMoves = (dest) => {
        const [ySrc, xSrc] = Tile.GetXYTile(this.piecePosition)
        const [yDest, xDest] = Tile.GetXYTile(dest)

        // white validation
        if(this.isWhite) {
            // length of the source to dest more than 2 or less than 0
            if(yDest - ySrc > 2 || yDest - ySrc < 0) return false
            
            // validate the white pawn cannot go sideway (except for eat the black pawn)
            // and the left or rightdiagonal did not contain black piece
            let leftDiagonal = (xDest - xSrc === -1 && yDest - ySrc === 1)
            let rightDiagonal = (xDest - xSrc === 1 && yDest - ySrc === 1)
            if(
                Math.abs(xSrc - xDest) !== 0 && 
                (!leftDiagonal || !TileController.IsTileHaveChildren(dest)) &&
                (!rightDiagonal || !TileController.IsTileHaveChildren(dest))
            ) return false 
            
            // validate the first move is not able to use anymore
            if(this.isFirstMove === true && yDest - ySrc > 1) return false

            // validate if the front has piece
            if(TileController.IsTileHaveChildren(dest) && xDest - xSrc === 0) return false

            // pawn is eating
            if(TileController.IsTileHaveChildren(dest)) PieceController.HandleCapture(TileController.GetChildrenElement(dest).id)
            
            this.isFirstMove = true
            return true
        } 

        // black validation
        else {
            // length of the source to dest more than 2 or less than 0
            if(ySrc - yDest > 2 || ySrc - yDest < 0) return false

            // validate the white pawn cannot go sideway (except for eat the black pawn)
            // and the left or right diagonal did not contain black piece
            let leftDiagonal = (xDest - xSrc === -1 && yDest - ySrc === -1)
            let rightDiagonal = (xDest - xSrc === 1 && yDest - ySrc === -1)
            if(Math.abs(xSrc - xDest) !== 0 && !leftDiagonal && !rightDiagonal) return false 

            // validate the first move is not able to use anymore
            if(this.isFirstMove === true && ySrc - yDest > 1) return false

            // validate if the front has piece
            if(TileController.IsTileHaveChildren(dest) && xDest - xSrc === 0) return false

            // pawn is eating
            if(TileController.IsTileHaveChildren(dest)) {
                PieceController.HandleCapture(TileController.GetChildrenElement(dest).id)
            }

            this.isFirstMove = true
            return true
        }

    }

    MovementMechanism = () => {
        if (this.ClickedPiece()) {
        } else {
            console.log('This piece is not selected')
        }
    }
}
