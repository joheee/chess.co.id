import { PieceController } from "../controller/PieceController.js";
import { TileController } from "../controller/TileController.js";
import { GetKeyPieces } from "../logic/Control.js";
import { Piece } from "./Piece.js";
import { Tile } from "./Tile.js";

export class Bishop extends Piece {
    constructor(isCaptured,piecePosition,isWhite,elementId){
        super(isCaptured, piecePosition, isWhite, elementId)
        this.pawnValue = 3
        this.MovementListener()
    }
    MovementMechanism = () => {
        console.log(this)
    }  
    ValidMoves = (dest) => {
        const [ySrc, xSrc] = Tile.GetXYTile(this.piecePosition)
        const [yDest, xDest] = Tile.GetXYTile(dest)
        
        const deltaY = Math.abs(yDest - ySrc)
        const deltaX = Math.abs(xDest - xSrc) 

        if (deltaY !== deltaX) return false

        const yDirection = yDest > ySrc ? 1 : -1
        const xDirection = xDest > xSrc ? 1 : -1

        for (let i = 1; i < deltaY; i++) {
            const y = ySrc + i * yDirection
            const x = xSrc + i * xDirection

            // check whether there is a piece 
            let curr = y * 10 + x
            if (TileController.IsTileHaveChildren(curr)) return false
        }

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
}