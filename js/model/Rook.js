import { PieceController } from "../controller/PieceController.js";
import { TileController } from "../controller/TileController.js";
import { GetKeyPieces } from "../logic/Control.js";
import { Piece } from "./Piece.js";
import { Tile } from "./Tile.js";

export class Rook extends Piece {
    constructor(isCaptured,piecePosition,isWhite,elementId){
        super(isCaptured, piecePosition, isWhite, elementId)
        this.pawnValue = 5
        this.MovementListener()
    }
    MovementMechanism = () => {
        console.log(this)
    }  
    ValidMoves = (dest) => {
        const [ySrc, xSrc] = Tile.GetXYTile(this.piecePosition)
        const [yDest, xDest] = Tile.GetXYTile(dest)
        
        // Check if the movement is either horizontal or vertical
        if (ySrc !== yDest && xSrc !== xDest) return false

        // check whether the path is clear
        if (!this.isPathClear(ySrc, xSrc, yDest, xDest)) return false

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

        return true
    }

    isPathClear(ySrc, xSrc, yDest, xDest) {
        // Check if the movement is horizontal
        if (ySrc === yDest) {
          const xDirection = xDest > xSrc ? 1 : -1; // Determine the direction (left or right)
    
          // Check each square on the horizontal path for obstructions
          for (let x = xSrc + xDirection; x !== xDest; x += xDirection) {
            // Check if there's a piece at the square (ySrc, x)
            // Implement your logic to check if there's a piece at the current square (ySrc, x)
            if (TileController.IsTileHaveChildren(ySrc * 10 + x)) return false
        }
    }
        // Check if the movement is vertical
        else if (xSrc === xDest) {
          const yDirection = yDest > ySrc ? 1 : -1; // Determine the direction (up or down)
          
          // Check each square on the vertical path for obstructions
          for (let y = ySrc + yDirection; y !== yDest; y += yDirection) {
            // Check if there's a piece at the square (y, xSrc)
            // Implement your logic to check if there's a piece at the current square (y, xSrc)
            if (TileController.IsTileHaveChildren(y * 10 + xSrc)) return false
          }
        }
    
        // If no obstructions are found, the path is clear
        return true;
      }

    MovementMechanism = () => {
        if (this.ClickedPiece()) {
            console.log(this)
        } else {
            console.log('This piece is not selected')
        }
    }
}