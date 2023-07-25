
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

    ValidMoves = (dest) => {
        const [ySrc, xSrc] = Tile.GetXYTile(this.piecePosition)
        const [yDest, xDest] = Tile.GetXYTile(dest)

        // Calculate the absolute differences in x and y coordinates
        const deltaX = Math.abs(xDest - xSrc)
        const deltaY = Math.abs(yDest - ySrc)

        // Knight's L-shaped move: 2 steps in one direction and 1 step in a perpendicular direction
        const isValidMove =
        (deltaX === 1 && deltaY === 2) ||
        (deltaX === 2 && deltaY === 1)

        if(!isValidMove) return false

        // capture piece for white
        return PieceController.CapturePieceMechanism(this, dest)
    }

    HorseGrid (tile, isWhite) {

        let x = tile % 10
        let y = (tile - x) / 10     
        if(x < 1 || x > 8 || y < 1 || y > 8) return

        if(TileController.IsTileHaveChildren(tile)) {
            let item = GetKeyPieces(TileController.GetChildrenElement(tile).id)
            
            // if black
            if(isWhite) {
                if(!item.isWhite) Tile.HintBackground(tile)
            }
            // if white
            else {
                if(item.isWhite) Tile.HintBackground(tile)
            }
        } else {
            Tile.HintBackground(tile)
        }
    }

    MovementMechanism = () => {
        if (this.ClickedPiece()) {
            let x = this.piecePosition % 10
            let y = (this.piecePosition - x) / 10            

            // let coordinates
            let TopLeftTile = (y + 2) * 10 + x-1 
            let TopBottomMoves = (y + 2) * 10 + x+1  
            let LeftTopMoves = (y - 1) * 10 + x+2   
            let LeftBottomMoves = (y - 1) * 10 + x-2  
            let RightTopMoves = (y + 1) * 10 + x+2
            let RightBottomMoves = (y + 1) * 10 + x-2  
            let BottomLeftMoves = (y - 2) * 10 + x-1  
            let BottomRightMovex = (y - 2) * 10 + x+1 

            // black
            if(!this.isWhite) {
                this.HorseGrid(TopLeftTile, false)
                this.HorseGrid(TopBottomMoves, false)
                this.HorseGrid(LeftTopMoves, false)
                this.HorseGrid(LeftBottomMoves, false)
                this.HorseGrid(RightTopMoves, false)
                this.HorseGrid(RightBottomMoves, false)
                this.HorseGrid(BottomLeftMoves, false)
                this.HorseGrid(BottomRightMovex, false)
            } 
            // white
            else {
                this.HorseGrid(TopLeftTile, true)
                this.HorseGrid(TopBottomMoves, true)
                this.HorseGrid(LeftTopMoves, true)
                this.HorseGrid(LeftBottomMoves, true)
                this.HorseGrid(RightTopMoves, true)
                this.HorseGrid(RightBottomMoves, true)
                this.HorseGrid(BottomLeftMoves, true)
                this.HorseGrid(BottomRightMovex, true)
            }

        } else {
            console.log('This piece is not selected')
            Tile.ResetBackground()
            Tile.ResetHintBackground()
        }
    }
}   