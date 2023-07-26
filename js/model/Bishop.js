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
    ValidMoves = (dest) => {
        const [ySrc, xSrc] = Tile.GetXYTile(this.piecePosition)
        const [yDest, xDest] = Tile.GetXYTile(dest)
        
        // diagonal movement validation
        if(!PieceController.DiagonalValidation(xSrc,ySrc,xDest,yDest)) return false

        // capture piece for white
        return PieceController.CapturePieceMechanism(this, dest)

    }

    MovementMechanism = () => {
        if (this.ClickedPiece()) {
            let x = this.piecePosition % 10
            let y = (this.piecePosition - x) / 10      
            
            // white bishop
            if (this.isWhite) {
                // Top-left diagonal
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
              
                // Top-right diagonal
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
              
                // Bottom-left diagonal
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
              
                // Bottom-right diagonal
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
            // black bishop
            else {
                // Top-left diagonal
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
              
                // Top-right diagonal
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
              
                // Bottom-left diagonal
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
              
                // Bottom-right diagonal
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