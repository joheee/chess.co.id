import { PieceController } from "../controller/PieceController.js";
import { TileController } from "../controller/TileController.js";
import { GetKeyPieces } from "../logic/Control.js";
import { Piece } from "./Piece.js";
import { Tile } from "./Tile.js";

export class Queen extends Piece {
    constructor(isCaptured,piecePosition,isWhite,elementId){
        super(isCaptured, piecePosition, isWhite, elementId)
        this.pawnValue = 9
        this.MovementListener()
    }
    MovementMechanism = () => {
        console.log(this)
    }  
    ValidMoves = (dest) => {
        const [ySrc, xSrc] = Tile.GetXYTile(this.piecePosition)
        const [yDest, xDest] = Tile.GetXYTile(dest)

         // Check if the movement is either horizontal, vertical, or diagonal
        const deltaY = Math.abs(yDest - ySrc)
        const deltaX = Math.abs(xDest - xSrc)

        // The move is neither horizontal, vertical, nor diagonal
        if (deltaY !== deltaX && ySrc !== yDest && xSrc !== xDest) return false

        // Check if there are no obstructions along the horizontal, vertical, or diagonal path
        if (!PieceController.IsPathClearForQueen(ySrc, xSrc, yDest, xDest)) return false
        
        // capture pawn for white
        if(this.isWhite) {
            // checking whether the destination contains pieces or not
            if(TileController.IsTileHaveChildren(dest)) {
                let piece = GetKeyPieces(TileController.GetChildrenElement(dest).id)
                if(piece.isWhite) return false 
                else {
                    PieceController.HandleCapture(TileController.GetChildrenElement(dest).id)
                }
            }
            return true
        } 
        // capture pawn for black
        else {
            // checking whether the destination contains pieces or not
            if(TileController.IsTileHaveChildren(dest)) {
                let piece = GetKeyPieces(TileController.GetChildrenElement(dest).id)
                if(!piece.isWhite) return false 
                else {
                    PieceController.HandleCapture(TileController.GetChildrenElement(dest).id)
                }
            }
            return true
        }
    }

    MovementMechanism = () => {
        if (this.ClickedPiece()) {
            console.log(this)
        } else {
            console.log('This piece is not selected')
        }
    }
    static CreateQueenElement(id){
        
    }
}