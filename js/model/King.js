import { Variable } from "../config/Variable.js";
import { PieceController } from "../controller/PieceController.js";
import { TileController } from "../controller/TileController.js";
import { GetKeyPieces } from "../logic/Control.js";
import { Piece } from "./Piece.js";
import { Rook } from "./Rook.js";
import { Tile } from "./Tile.js";

export class King extends Piece {
    constructor(isCaptured,piecePosition,isWhite,elementId){
        super(isCaptured, piecePosition, isWhite, elementId)
        this.pawnValue = 0
        this.isFirstMove = false
        this.MovementListener()
    }

    ValidMoves = (dest) => {
        const [ySrc, xSrc] = Tile.GetXYTile(this.piecePosition)
        const [yDest, xDest] = Tile.GetXYTile(dest)

        const deltaY = Math.abs(yDest - ySrc)
        const deltaX = Math.abs(xDest - xSrc)

        // check availibility for castle
        if(!this.isFirstMove){
            // iterate to the right side
            for(let i=xSrc+1;i<=8;i++){
                let tile = ySrc * 10 + i
                // check children
                if(TileController.IsTileHaveChildren(tile)){
                    const item = GetKeyPieces(TileController.GetChildrenElement(tile).id)
                    let isRook = item instanceof Rook
                    // rook is not present
                    if(!isRook) break
                    else {
                        let kingNew = tile - 1
                        let rookNew = tile - 2
                        if(kingNew === yDest * 10 + xDest) {
                            TileController.HandlePieceMovement(this.elementId, kingNew)
                            item.ClickedPiece()
                            TileController.HandlePieceMovement(item.elementId, rookNew)
                        }
                        break
                    }
                }
            }

            // iterate to the left side
            for(let i=xSrc-1;i>=1;i--){
                let tile = ySrc * 10 + i
                // check children
                if(TileController.IsTileHaveChildren(tile)){
                    const item = GetKeyPieces(TileController.GetChildrenElement(tile).id)
                    let isRook = item instanceof Rook
                    // rook is not present
                    if(!isRook) break
                    else {
                        let kingNew = tile + 1
                        let rookNew = tile + 2
                        if(kingNew === yDest * 10 + xDest - 1) {
                            TileController.HandlePieceMovement(this.elementId, kingNew)
                            item.ClickedPiece()
                            TileController.HandlePieceMovement(item.elementId, rookNew)
                        }
                        break
                    }
                }
            }
        }

        // Check if the destination is within one square distance
        if (deltaY > 1 || deltaX > 1) return false

        // The move is neither horizontal, vertical, nor diagonal
        if (deltaY !== deltaX && ySrc !== yDest && xSrc !== xDest) return false
        
        this.isFirstMove = true
        // capture piece for white
        return PieceController.CapturePieceMechanism(this, dest)
    }

    MovementMechanism = () => {
        if (this.ClickedPiece()) {
            let x = this.piecePosition % 10
            let y = (this.piecePosition - x) / 10      

            if(!this.isFirstMove) {
                // iterate to the right side for castle 
                for(let i=x+1;i<=8;i++){
                    let tile = y * 10 + i
                    // check children
                    if(TileController.IsTileHaveChildren(tile)){
                        const item = GetKeyPieces(TileController.GetChildrenElement(tile).id)
                        let isRook = item instanceof Rook
                        // rook is not present
                        if(!isRook) break
                        else {
                            let kingNew = tile - 1
                            Tile.HintBackground(kingNew)
                            break
                        }
                    }
                }
    
                // iterate to the left side for castle
                for(let i=x-1;i>=1;i--){
                    let tile = y * 10 + i
                    // check children
                    if(TileController.IsTileHaveChildren(tile)){
                        const item = GetKeyPieces(TileController.GetChildrenElement(tile).id)
                        let isRook = item instanceof Rook
                        // rook is not present
                        if(!isRook) break
                        else {
                            let kingNew = tile + 1
                            Tile.HintBackground(kingNew + 1)
                            break
                        }
                    }
                }
            }

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