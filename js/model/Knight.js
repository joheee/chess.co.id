import { PieceController } from "../controller/PieceController.js";
import { TileController } from "../controller/TileController.js";
import { Piece } from "./Piece.js";
import { Tile } from "./Tile.js";
import { GetKeyPieces } from "../logic/Control.js";

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
        const [ySrc, xSrc] = Tile.GetXYTile(this.piecePosition)
        const [yDest, xDest] = Tile.GetXYTile(dest)

        // white validation 
        let x = xDest - xSrc
        let y = yDest - ySrc

        // top side
        let TopLeftMoves = x === -1 && y === 2
        let TopBottomMoves = x === 1 && y === 2
        console.log(TopLeftMoves, TopBottomMoves)
        
        // left side
        let LeftTopMoves = x === -2 && y === 1
        let LeftBottomMoves = x === -2 && y === -1

        // right side
        let RightTopMoves = x === 2 && y === 1
        let RightBottomMoves = x === 2 && y === -1

        // bottom side
        let BottomLeftMoves = x === -1 && y === -2
        let BottomRightMovex = x === 1 && y === -2

        // valid moves validation in L shape
        if(
            !LeftTopMoves && 
            !LeftBottomMoves && 
            !TopLeftMoves && 
            !TopBottomMoves &&
            !RightTopMoves &&
            !RightBottomMoves &&
            !BottomLeftMoves &&
            !BottomRightMovex
        ) return false

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