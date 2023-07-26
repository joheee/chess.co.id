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

    ValidMoves = (dest) => {
        const [ySrc, xSrc] = Tile.GetXYTile(this.piecePosition)
        const [yDest, xDest] = Tile.GetXYTile(dest)

        // Check if there are no obstructions along the horizontal, vertical, or diagonal path
        if (!PieceController.IsPathClearForQueen(ySrc, xSrc, yDest, xDest)) return false
        
        // capture piece for white
        return PieceController.CapturePieceMechanism(this, dest)

    }

    MovementMechanism = () => {
        if (this.ClickedPiece()) {
            let x = this.piecePosition % 10
            let y = (this.piecePosition - x) / 10   

            // white queen
            if (this.isWhite) {
                // Highlight valid tiles in upward direction (same as rook's logic)
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
              
                // Highlight valid tiles in downward direction (same as rook's logic)
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
              
                // Highlight valid tiles in left direction (same as rook's logic)
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
              
                // Highlight valid tiles in right direction (same as rook's logic)
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
              
                // Highlight valid tiles in top-left diagonal direction (same as bishop's logic)
                for (let i = y - 1, j = x - 1; i >= 1 && j >= 1; i--, j--) {
                    let tile = i * 10 + j;
                    if (TileController.IsTileHaveChildren(tile)) {
                        let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                        if (!item.isWhite) {
                        Tile.HintBackground(tile);
                        }
                        break;
                    }
                    Tile.HintBackground(tile);
                }
              
                // Highlight valid tiles in top-right diagonal direction (same as bishop's logic)
                for (let i = y - 1, j = x + 1; i >= 1 && j <= 8; i--, j++) {
                    let tile = i * 10 + j;
                    if (TileController.IsTileHaveChildren(tile)) {
                        let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                        if (!item.isWhite) {
                        Tile.HintBackground(tile);
                        }
                        break;
                    }
                    Tile.HintBackground(tile);
                }
              
                // Highlight valid tiles in bottom-left diagonal direction (same as bishop's logic)
                for (let i = y + 1, j = x - 1; i <= 8 && j >= 1; i++, j--) {
                    let tile = i * 10 + j;
                    if (TileController.IsTileHaveChildren(tile)) {
                        let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                        if (!item.isWhite) {
                        Tile.HintBackground(tile);
                        }
                        break;
                    }
                    Tile.HintBackground(tile);
                }
              
                // Highlight valid tiles in bottom-right diagonal direction (same as bishop's logic)
                for (let i = y + 1, j = x + 1; i <= 8 && j <= 8; i++, j++) {
                    let tile = i * 10 + j;
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
            // black queen
            else {
                // Highlight valid tiles in upward direction (same as rook's logic)
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
              
                // Highlight valid tiles in downward direction (same as rook's logic)
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
              
                // Highlight valid tiles in left direction (same as rook's logic)
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
              
                // Highlight valid tiles in right direction (same as rook's logic)
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
              
                // Highlight valid tiles in top-left diagonal direction (same as bishop's logic)
                for (let i = y - 1, j = x - 1; i >= 1 && j >= 1; i--, j--) {
                    let tile = i * 10 + j;
                    if (TileController.IsTileHaveChildren(tile)) {
                        let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                        if (item.isWhite) {
                        Tile.HintBackground(tile);
                        }
                        break;
                    }
                    Tile.HintBackground(tile);
                }
              
                // Highlight valid tiles in top-right diagonal direction (same as bishop's logic)
                for (let i = y - 1, j = x + 1; i >= 1 && j <= 8; i--, j++) {
                    let tile = i * 10 + j;
                    if (TileController.IsTileHaveChildren(tile)) {
                        let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                        if (item.isWhite) {
                        Tile.HintBackground(tile);
                        }
                        break;
                    }
                    Tile.HintBackground(tile);
                }
              
                // Highlight valid tiles in bottom-left diagonal direction (same as bishop's logic)
                for (let i = y + 1, j = x - 1; i <= 8 && j >= 1; i++, j--) {
                    let tile = i * 10 + j;
                    if (TileController.IsTileHaveChildren(tile)) {
                        let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                        if (item.isWhite) {
                        Tile.HintBackground(tile);
                        }
                        break;
                    }
                    Tile.HintBackground(tile);
                }
              
                // Highlight valid tiles in bottom-right diagonal direction (same as bishop's logic)
                for (let i = y + 1, j = x + 1; i <= 8 && j <= 8; i++, j++) {
                    let tile = i * 10 + j;
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