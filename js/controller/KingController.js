import { BlackPieces, WhitePieces } from "../index.js";
import { GetKeyPieces } from "../logic/Control.js";
import { Tile } from "../model/Tile.js";
import { PieceController } from "./PieceController.js";
import { TileController } from "./TileController.js";

export class KingController {

    static KingBlackCheck(kingPosition){
        let arr = []

        for (const pieceKey in WhitePieces) {
            if (WhitePieces.hasOwnProperty(pieceKey)) {
                const piece = WhitePieces[pieceKey]
                // piece is not captured
                if(!piece.isCaptured) {
                    let key = piece.elementId.split('-')[0].split('')
                    const [ySrc, xSrc] = Tile.GetXYTile(piece.piecePosition)
                    const [yDest, xDest] = Tile.GetXYTile(kingPosition)

                    // pawn threaten
                    if(key[1] === 'p') {
                        // is there any white pawn that check the king from left or right diagonal
                        if(PieceController.IsWhitePawnThreaten(xSrc,ySrc,xDest,yDest)) {
                            arr.push(piece)
                        }
                    }

                    // bishop threaten
                    if(key[1] === 'b') {
                        // any bishop that threaten through diagonal tile
                        if(PieceController.DiagonalValidation(xSrc,ySrc,xDest,yDest)) {
                            arr.push(piece)
                        }
                    }
                    
                    // knight threaten
                    if(key[1] === 'n') {
                        // knight threaten validation
                        if(PieceController.KnightMovementValidation(xSrc,ySrc,xDest,yDest)) arr.push(piece)
                    }

                    // rook threaten
                    if(key[1] === 'r') {
                        // rook threaten validation
                        if(PieceController.IsPathClear(ySrc, xSrc, yDest, xDest)) {
                            arr.push(piece)
                        }
                    }
                    
                    // queen threaten
                    if(key[1] === 'q') {
                        // white queen is threatening
                        if(PieceController.IsPathClearForQueen(ySrc,xSrc,yDest,xDest)){
                            arr.push(piece)
                        }
                    }
                }
            }
        }
        return arr
    }

    static KingWhiteCheck(kingPosition){
        let arr = []

        for (const pieceKey in BlackPieces) {
            if (BlackPieces.hasOwnProperty(pieceKey)) {
                const piece = BlackPieces[pieceKey]
                // piece is not captured
                if(!piece.isCaptured) {
                    let key = piece.elementId.split('-')[0].split('')
                    const [ySrc, xSrc] = Tile.GetXYTile(piece.piecePosition)
                    const [yDest, xDest] = Tile.GetXYTile(kingPosition)

                    // pawn threaten
                    if(key[1] === 'p') {
                        // is there any white pawn that check the king from left or right diagonal
                        if(PieceController.IsWhitePawnThreaten(xSrc,ySrc,xDest,yDest)) {
                            arr.push(piece)
                        }
                    }

                    // bishop threaten
                    if(key[1] === 'b') {
                        // any bishop that threaten through diagonal tile
                        if(PieceController.DiagonalValidation(xSrc,ySrc,xDest,yDest)) {
                            arr.push(piece)
                        }
                    }
                    
                    // knight threaten
                    if(key[1] === 'n') {
                        // knight threaten validation
                        if(PieceController.KnightMovementValidation(xSrc,ySrc,xDest,yDest)) arr.push(piece)
                    }

                    // rook threaten
                    if(key[1] === 'r') {
                        // rook threaten validation
                        if(PieceController.IsPathClear(ySrc, xSrc, yDest, xDest)) {
                            arr.push(piece)
                        }
                    }
                    
                    // queen threaten
                    if(key[1] === 'q') {
                        // white queen is threatening
                        if(PieceController.IsPathClearForQueen(ySrc,xSrc,yDest,xDest)){
                            arr.push(piece)
                        }
                    }
                }
            }
        }
        return arr
    }
    
    static IsKingBlackCheck(kingPosition){
        return this.KingBlackCheck(kingPosition).length > 0
    }
    
    static IsKingWhiteCheck(kingPosition){
        return this.KingWhiteCheck(kingPosition).length > 0
    }

    static GetKingThreaten(isWhite){
        if(!isWhite) return this.KingBlackCheck(GetKeyPieces('bk').piecePosition)
        return KingWhiteCheck(GetKeyPieces('wk').piecePosition)
    }

    static CheckKingIsThreaten(isWhite){
        if (!isWhite && this.IsKingBlackCheck(GetKeyPieces('bk').piecePosition)) {
            console.log('King black is in check');
            return true;
        }
        
        if (isWhite && this.IsKingWhiteCheck(GetKeyPieces('wk').piecePosition)) {
            console.log('King white is in check');
            return true;
        }
        
        return false;
    }
}