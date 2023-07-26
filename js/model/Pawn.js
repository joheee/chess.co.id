import { Variable } from "../config/Variable.js";
import { PieceController } from "../controller/PieceController.js";
import { TileController } from "../controller/TileController.js";
import { GetKeyPieces } from "../logic/Control.js";
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

            // update the first move
            this.isFirstMove = true

            return PieceController.CapturePieceMechanism(this, dest)

        } 

        // black validation
        else {
            // length of the source to dest more than 2 or less than 0
            if(ySrc - yDest > 2 || ySrc - yDest < 0) return false

            // validate the white pawn cannot go sideway (except for eat the black pawn)
            // and the left or right diagonal did not contain black piece
            let leftDiagonal = (xDest - xSrc === -1 && yDest - ySrc === -1)
            let rightDiagonal = (xDest - xSrc === 1 && yDest - ySrc === -1)
            if(
                Math.abs(xSrc - xDest) !== 0 && 
                (!leftDiagonal || !TileController.IsTileHaveChildren(dest)) &&
                (!rightDiagonal || !TileController.IsTileHaveChildren(dest))
            ) return false 

            // validate the first move is not able to use anymore
            if(this.isFirstMove === true && ySrc - yDest > 1) return false

            // validate if the front has piece
            if(TileController.IsTileHaveChildren(dest) && xDest - xSrc === 0) return false

            // update the first move
            this.isFirstMove = true

            return PieceController.CapturePieceMechanism(this, dest)

        }
    }

    MovementMechanism = () => {
        if (this.ClickedPiece()) {
            let x = this.piecePosition % 10
            let y = (this.piecePosition - x) / 10
            
            // white pawn
            if(this.isWhite) {

                // check is first move
                if(!this.isFirstMove) {
                    for(let i=1;i<=2;i++) {
                        let firstMoveTile = (y+i) * 10 + x
                        Tile.HintBackground(firstMoveTile)
                    }
                    return  
                }
                
                // if front is empty
                let frontTile = (y+1) * 10 + x
                if(y < 8 && !TileController.IsTileHaveChildren(frontTile)) Tile.HintBackground(frontTile)

                // if at the left diagonal exist black pieces
                let leftDiagonalTile = (y+1) * 10 + x - 1
                if(x > 1 && x < 8 && y > 1 && y < 8 && TileController.IsTileHaveChildren(leftDiagonalTile)){
                    // if black 
                    let item = GetKeyPieces(TileController.GetChildrenElement(leftDiagonalTile).id)
                    if(!item.isWhite) Tile.HintBackground(leftDiagonalTile)
                }

                let rightDiagonalTile = (y+1) * 10 + x + 1
                if(x > 1 && x < 8 && y > 1 && y < 8 && TileController.IsTileHaveChildren(rightDiagonalTile)){
                    // if black 
                    let item = GetKeyPieces(TileController.GetChildrenElement(rightDiagonalTile).id)
                    if(!item.isWhite) Tile.HintBackground(rightDiagonalTile)
                }
            }
            // black pawn
            else {
                // check is first move
                if(!this.isFirstMove) {
                    for(let i=1;i<=2;i++) {
                        let firstMoveTile = (y-i) * 10 + x
                        Tile.HintBackground(firstMoveTile)
                    }
                    return  
                }
                
                // if front is empty
                let frontTile = (y-1) * 10 + x
                if(y < 8 && !TileController.IsTileHaveChildren(frontTile)) Tile.HintBackground(frontTile)

                // if at the left diagonal exist black pieces
                let leftDiagonalTile = (y-1) * 10 + x - 1
                if(x > 1 && y < 8 && TileController.IsTileHaveChildren(leftDiagonalTile)){
                    // if white 
                    let item = GetKeyPieces(TileController.GetChildrenElement(leftDiagonalTile).id)
                    if(item.isWhite) Tile.HintBackground(leftDiagonalTile)
                }

                let rightDiagonalTile = (y-1) * 10 + x + 1
                if(x > 1 && y < 8 && TileController.IsTileHaveChildren(rightDiagonalTile)){
                    // if white 
                    let item = GetKeyPieces(TileController.GetChildrenElement(rightDiagonalTile).id)
                    if(item.isWhite) Tile.HintBackground(rightDiagonalTile)
                }
            }
        } else {
            console.log('This piece is not selected')
        }
    }
}
