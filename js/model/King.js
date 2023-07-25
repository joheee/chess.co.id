import { PieceController } from "../controller/PieceController.js";
import { TileController } from "../controller/TileController.js";
import { GetKeyPieces } from "../logic/Control.js";
import { Piece } from "./Piece.js";
import { Tile } from "./Tile.js";

export class King extends Piece {
    constructor(isCaptured,piecePosition,isWhite,elementId){
        super(isCaptured, piecePosition, isWhite, elementId)
        this.pawnValue = 0
        this.MovementListener()
    }

    ValidMoves = (dest) => {
        const [ySrc, xSrc] = Tile.GetXYTile(this.piecePosition)
        const [yDest, xDest] = Tile.GetXYTile(dest)

        const deltaY = Math.abs(yDest - ySrc)
        const deltaX = Math.abs(xDest - xSrc)

        // Check if the destination is within one square distance
        if (deltaY > 1 || deltaX > 1) return false

        // The move is neither horizontal, vertical, nor diagonal
        if (deltaY !== deltaX && ySrc !== yDest && xSrc !== xDest) return false
        
        // capture piece for white
        return PieceController.CapturePieceMechanism(this, dest)
    }

    MovementMechanism = () => {
        if (this.ClickedPiece()) {
            let x = this.piecePosition % 10
            let y = (this.piecePosition - x) / 10      

            // white king
            if (this.isWhite) {
                const directions = [
                  [-1, -1], [-1, 0], [-1, 1],
                  [0, -1], /*KING*/ [0, 1],
                  [1, -1], [1, 0], [1, 1]
                ];
              
                for (const [dy, dx] of directions) {
                    const yNext = y + dy;
                    const xNext = x + dx;
                    if (yNext >= 1 && yNext <= 8 && xNext >= 1 && xNext <= 8) {
                        const tile = yNext * 10 + xNext;
                        if (!TileController.IsTileHaveChildren(tile)) {
                            Tile.HintBackground(tile);
                        } else {
                            const item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                            if (!item.isWhite) {
                                Tile.HintBackground(tile);
                            }
                        }
                    }
                }
            }

            // black king
            else {
                const directions = [
                  [-1, -1], [-1, 0], [-1, 1],
                  [0, -1], /*KING*/ [0, 1],
                  [1, -1], [1, 0], [1, 1]
                ];
              
                for (const [dy, dx] of directions) {
                    const yNext = y + dy;
                    const xNext = x + dx;
                    if (yNext >= 1 && yNext <= 8 && xNext >= 1 && xNext <= 8) {
                        const tile = yNext * 10 + xNext;
                        if (!TileController.IsTileHaveChildren(tile)) {
                            Tile.HintBackground(tile);
                        } else {
                            const item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                            if (item.isWhite) {
                                Tile.HintBackground(tile);
                            }
                        }
                    }
                }
            }
              

        } else {
            console.log('This piece is not selected')
            Tile.ResetBackground()
            Tile.ResetHintBackground()
        }
    }
}