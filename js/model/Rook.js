import { PieceController } from "../controller/PieceController.js";
import { TileController } from "../controller/TileController.js";
import { GetKeyPieces } from "../logic/Control.js";
import { Piece } from "./Piece.js";
import { Tile } from "./Tile.js";

export class Rook extends Piece {
    constructor(isCaptured,piecePosition,isWhite,elementId){
        super(isCaptured, piecePosition, isWhite, elementId)
        this.pawnValue = 5
        this.isFirstMove = false
        this.MovementListener()
    }

    ValidMoves = (dest) => {
        const [ySrc, xSrc] = Tile.GetXYTile(this.piecePosition)
        const [yDest, xDest] = Tile.GetXYTile(dest)
        
        if(!PieceController.IsPathClear(ySrc, xSrc, yDest, xDest)) return false

        this.isFirstMove = true

        // capture piece for white
        return PieceController.CapturePieceMechanism(this, dest)

    }

    

    MovementMechanism = () => {
        if (this.ClickedPiece()) {
            let x = this.piecePosition % 10
            let y = (this.piecePosition - x) / 10     
            if (this.isWhite) {
                // Highlight valid tiles in upward direction
                for (let i = y - 1; i >= 1; i--) {
                    let tile = i * 10 + x;
                    if (TileController.IsTileHaveChildren(tile)) {
                        let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                        if (!item.isWhite) {
                        Tile.HintBackground(tile);
                        }
                        break;
                    }
                    Tile.HintBackground(tile);
                }
              
                // Highlight valid tiles in downward direction
                for (let i = y + 1; i <= 8; i++) {
                    let tile = i * 10 + x;
                    if (TileController.IsTileHaveChildren(tile)) {
                        let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                        if (!item.isWhite) {
                        Tile.HintBackground(tile);
                        }
                        break;
                    }
                    Tile.HintBackground(tile);
                }
              
                // Highlight valid tiles in left direction
                for (let j = x - 1; j >= 1; j--) {
                    let tile = y * 10 + j;
                    if (TileController.IsTileHaveChildren(tile)) {
                        let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                        if (!item.isWhite) {
                        Tile.HintBackground(tile);
                        }
                        break;
                    }
                    Tile.HintBackground(tile);
                }
              
                // Highlight valid tiles in right direction
                for (let j = x + 1; j <= 8; j++) {
                    let tile = y * 10 + j;
                    if (TileController.IsTileHaveChildren(tile)) {
                        let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                        if (!item.isWhite) {
                        Tile.HintBackground(tile);
                        }
                        break;
                    }
                    Tile.HintBackground(tile);
                }
            }
            // black rook
            else {
                // Highlight valid tiles in upward direction
                for (let i = y - 1; i >= 1; i--) {
                    let tile = i * 10 + x;
                    if (TileController.IsTileHaveChildren(tile)) {
                        let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                        if (item.isWhite) {
                        Tile.HintBackground(tile);
                        }
                        break;
                    }
                    Tile.HintBackground(tile);
                }
              
                // Highlight valid tiles in downward direction
                for (let i = y + 1; i <= 8; i++) {
                    let tile = i * 10 + x;
                    if (TileController.IsTileHaveChildren(tile)) {
                        let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                        if (item.isWhite) {
                        Tile.HintBackground(tile);
                        }
                        break;
                    }
                    Tile.HintBackground(tile);
                }
              
                // Highlight valid tiles in left direction
                for (let j = x - 1; j >= 1; j--) {
                    let tile = y * 10 + j;
                    if (TileController.IsTileHaveChildren(tile)) {
                        let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                        if (item.isWhite) {
                        Tile.HintBackground(tile);
                        }
                        break;
                    }
                    Tile.HintBackground(tile);
                }
              
                // Highlight valid tiles in right direction
                for (let j = x + 1; j <= 8; j++) {
                    let tile = y * 10 + j;
                    if (TileController.IsTileHaveChildren(tile)) {
                        let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                        if (item.isWhite) {
                        Tile.HintBackground(tile);
                        }
                        break;
                    }
                    Tile.HintBackground(tile);
                }
            }
              
        } else {
            console.log('This piece is not selected')
        }
    }
}