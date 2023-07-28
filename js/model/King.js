import { Variable } from "../config/Variable.js";
import { KingController } from "../controller/KingController.js";
import { PieceController } from "../controller/PieceController.js";
import { TileController } from "../controller/TileController.js";
import { GetKeyOnly, GetKeyPieces } from "../logic/Control.js";
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
        // check if king is being checked
        if (KingController.CheckKingIsThreaten(this.isWhite)) {
            let arrThreaten = KingController.GetKingThreaten(this.isWhite)
            let responseMovement = KingController.RespondKingThreaten(this,arrThreaten,this.isWhite)

            if(responseMovement.length === 0) return false
            for (let i = 0; i < responseMovement.length; i++) {
                let move = responseMovement[i];
                if (dest === move) return PieceController.CapturePieceMechanism(this, dest)
            }
            return false;
        }

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
                            Variable.currentElement = this
                            TileController.HandleKingCastle(this.elementId, kingNew)
                            Variable.currentElement = item
                            TileController.HandleKingCastle(item.elementId, rookNew)
                            Variable.ResetState()
                            break
                        }
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
                            Variable.currentElement = this
                            TileController.HandleKingCastle(this.elementId, kingNew + 1)
                            Variable.currentElement = item
                            TileController.HandleKingCastle(item.elementId, rookNew + 1)
                            Variable.ResetState()
                            break
                        }
                    }
                }
            }
        }

        // Check if the destination is within one square distance
        if (!this.KingValidMovement().includes(dest)) return false
        
        this.isFirstMove = true
        // capture piece for white
        return PieceController.CapturePieceMechanism(this, dest)
    }

    KingValidMovement = () => {
        let itemKeyObject = GetKeyOnly(this.elementId)
        let possibleMove = KingController.GetAllPossibleMoves(this.isWhite)
        let enemyMove = KingController.GetAllPossibleMoves(!this.isWhite)
        let currentPossibleMove = possibleMove.filter(move => move.key === itemKeyObject)[0]

        let res = []

        // exist the way
        if(currentPossibleMove !== undefined) {
            res = currentPossibleMove.arr
            let enemyListMove = []
            
            enemyMove.forEach(e => {
                e.arr.forEach(em => {
                    enemyListMove.push(em)
                })
            })
            
            let remainKingMove = res.filter((move) => !enemyListMove.includes(move))
            console.log(currentPossibleMove,remainKingMove)
            res = remainKingMove
        }

        return res
    }

    MovementMechanism = () => {
        if (this.ClickedPiece()) {
            let x = this.piecePosition % 10
            let y = (this.piecePosition - x) / 10      

            // check if king is being checked
            if (KingController.CheckKingIsThreaten(this.isWhite)) {
                let arrThreaten = KingController.GetKingThreaten(this.isWhite)
                let responseMovement = KingController.RespondKingThreaten(this,arrThreaten,this.isWhite)

                if(responseMovement.length === 0) return 

                for (let i = 0; i < responseMovement.length; i++) {
                    let move = responseMovement[i];
                    Tile.HintBackground(move)
                }
                return 
            }

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
            this.KingValidMovement().forEach(i => {
                console.log(i)
                Tile.HintBackground(i)
            })

        } else {
        }
    }
}