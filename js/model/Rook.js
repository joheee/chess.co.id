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
        if(!PieceController.IsPathClear(ySrc, xSrc, yDest, xDest)) return false

        // capture piece for white
        return PieceController.CapturePieceMechanism(this, dest)

    }

    MovementMechanism = () => {
        if (this.ClickedPiece()) {
            console.log(this)
        } else {
            console.log('This piece is not selected')
        }
    }
}