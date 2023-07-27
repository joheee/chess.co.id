import { BlackPieces, WhitePieces } from "../index.js";
import { GetKeyOnly, GetKeyPieces } from "../logic/Control.js";
import { Tile } from "../model/Tile.js";
import { PathController } from "./PathController.js";
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
                        if(PieceController.IsBlackPawnThreaten(xSrc,ySrc,xDest,yDest)) {
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
        return this.KingWhiteCheck(GetKeyPieces('wk').piecePosition)
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


    // return gerakan untuk piece tertentu
    static GetAllPossibleMoves(isWhite){
        
        let res = []

        // the threaten king is white
        if(isWhite){
            // looping for each non captured allies
            for (const pieceKey in WhitePieces) {
                if (WhitePieces.hasOwnProperty(pieceKey)) {
                    const allies = WhitePieces[pieceKey]
                    
                    // allies is not captured
                    if(!allies.isCaptured) {
                        let key = allies.elementId.split('-')[0].split('')

                        const [y, x] = Tile.GetXYTile(allies.piecePosition)
    
                        // pawn allies
                        if(key[1] === 'p') {
                            let pawnArr = []
                            
                            // if front is empty
                            let frontTile = (y+1) * 10 + x
                            if(y < 8 && !TileController.IsTileHaveChildren(frontTile)) pawnArr.push(frontTile)

                            // check is first move
                            let firstMoveTile = (y+2) * 10 + x
                            if(!allies.isFirstMove && !TileController.IsTileHaveChildren(firstMoveTile)) {
                                pawnArr.push(firstMoveTile)
                            }

                            // if at the left diagonal exist black pieces
                            let leftDiagonalTile = (y+1) * 10 + x - 1
                            if(TileController.IsTileHaveChildren(leftDiagonalTile)){
                                // if black 
                                let item = GetKeyPieces(TileController.GetChildrenElement(leftDiagonalTile).id)
                                if(!item.isWhite) pawnArr.push(leftDiagonalTile)
                            }
                            
                            let rightDiagonalTile = (y+1) * 10 + x + 1
                            if(TileController.IsTileHaveChildren(rightDiagonalTile)){
                                // if black 
                                let item = GetKeyPieces(TileController.GetChildrenElement(rightDiagonalTile).id)
                                if(!item.isWhite) pawnArr.push(rightDiagonalTile)
                            }
                            if(pawnArr.length !== 0) {
                                let node = {
                                    key:pieceKey,
                                    arr:pawnArr
                                }
                                res.push(node)
                            }
                        }
    
                        // bishop allies
                        if(key[1] === 'b') {
                            let bishopArr = []
                            // Top-left diagonal
                            for (let i = y - 1, j = x - 1; i >= 1 && j >= 1; i--, j--) {
                                let tile = i * 10 + j;
                                if (TileController.IsTileHaveChildren(tile)) {
                                    let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                                    if (!item.isWhite) {
                                        bishopArr.push(tile)
                                    }
                                    break;
                                }
                                bishopArr.push(tile)
                            }

                            // Top-right diagonal
                            for (let i = y - 1, j = x + 1; i >= 1 && j <= 8; i--, j++) {
                                let tile = i * 10 + j;
                                if (TileController.IsTileHaveChildren(tile)) {
                                    let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                                    if (!item.isWhite) {
                                        bishopArr.push(tile)
                                    }
                                    break;
                                }
                                bishopArr.push(tile)
                            }

                            // Bottom-left diagonal
                            for (let i = y + 1, j = x - 1; i <= 8 && j >= 1; i++, j--) {
                                let tile = i * 10 + j;
                                if (TileController.IsTileHaveChildren(tile)) {
                                    let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                                    if (!item.isWhite) {
                                        bishopArr.push(tile)
                                    }
                                    break;
                                }
                                bishopArr.push(tile)
                            }

                            // Bottom-right diagonal
                            for (let i = y + 1, j = x + 1; i <= 8 && j <= 8; i++, j++) {
                                let tile = i * 10 + j;
                                if (TileController.IsTileHaveChildren(tile)) {
                                    let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                                    if (!item.isWhite) {
                                        bishopArr.push(tile)
                                    }
                                    break;
                                }
                                bishopArr.push(tile)
                            }
                            if(bishopArr.length !== 0) {
                                let node = {
                                    key:pieceKey,
                                    arr:bishopArr
                                }
                                res.push(node)
                            }
                        }
                        
                        // knight allies
                        if(key[1] === 'n') {

                        }
    
                        // rook allies
                        if(key[1] === 'r') {

                        }
                        
                        // queen allies
                        if(key[1] === 'q') {

                        }

                        // king white
                        if(key[1] === 'k') {

                        }
                    }
                }
            }
        } 
        // the threaten king is black
        else {
            // looping for each non captured allies
            for (const pieceKey in BlackPieces) {
                if (BlackPieces.hasOwnProperty(pieceKey)) {
                    const allies = BlackPieces[pieceKey]
                    
                    // allies is not captured
                    if(!allies.isCaptured) {
                        let key = allies.elementId.split('-')[0].split('')

                        const [y, x] = Tile.GetXYTile(allies.piecePosition)
    
                        // pawn allies
                        if(key[1] === 'p') {
                            let pawnArr = []
                            
                            // if front is empty
                            let frontTile = (y-1) * 10 + x
                            if(y < 8 && !TileController.IsTileHaveChildren(frontTile)) pawnArr.push(frontTile)

                            // check is first move
                            let firstMoveTile = (y-2) * 10 + x
                            if(!allies.isFirstMove && !TileController.IsTileHaveChildren(firstMoveTile)) {
                                pawnArr.push(firstMoveTile)
                            }

                            // if at the left diagonal exist black pieces
                            let leftDiagonalTile = (y-1) * 10 + x - 1
                            if(TileController.IsTileHaveChildren(leftDiagonalTile)){
                                // if black 
                                let item = GetKeyPieces(TileController.GetChildrenElement(leftDiagonalTile).id)
                                if(item.isWhite) pawnArr.push(leftDiagonalTile)
                            }
                            
                            let rightDiagonalTile = (y-1) * 10 + x + 1
                            if(TileController.IsTileHaveChildren(rightDiagonalTile)){
                                // if black 
                                let item = GetKeyPieces(TileController.GetChildrenElement(rightDiagonalTile).id)
                                if(item.isWhite) pawnArr.push(rightDiagonalTile)
                            }
                            if(pawnArr.length !== 0) {
                                let node = {
                                    key:pieceKey,
                                    arr:pawnArr
                                }
                                res.push(node)
                            }
                        }
    
                        // bishop allies
                        if(key[1] === 'b') {
                            let bishopArr = []
                            // Top-left diagonal
                            for (let i = y - 1, j = x - 1; i >= 1 && j >= 1; i--, j--) {
                                let tile = i * 10 + j;
                                if (TileController.IsTileHaveChildren(tile)) {
                                    let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                                    if (item.isWhite) {
                                        bishopArr.push(tile)
                                    }
                                    break;
                                }
                                bishopArr.push(tile)
                            }

                            // Top-right diagonal
                            for (let i = y - 1, j = x + 1; i >= 1 && j <= 8; i--, j++) {
                                let tile = i * 10 + j;
                                if (TileController.IsTileHaveChildren(tile)) {
                                    let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                                    if (item.isWhite) {
                                        bishopArr.push(tile)
                                    }
                                    break;
                                }
                                bishopArr.push(tile)
                            }

                            // Bottom-left diagonal
                            for (let i = y + 1, j = x - 1; i <= 8 && j >= 1; i++, j--) {
                                let tile = i * 10 + j;
                                if (TileController.IsTileHaveChildren(tile)) {
                                    let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                                    if (item.isWhite) {
                                        bishopArr.push(tile)
                                    }
                                    break;
                                }
                                bishopArr.push(tile)
                            }

                            // Bottom-right diagonal
                            for (let i = y + 1, j = x + 1; i <= 8 && j <= 8; i++, j++) {
                                let tile = i * 10 + j;
                                if (TileController.IsTileHaveChildren(tile)) {
                                    let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                                    if (item.isWhite) {
                                        bishopArr.push(tile)
                                    }
                                    break;
                                }
                                bishopArr.push(tile)
                            }
                            if(bishopArr.length !== 0) {
                                let node = {
                                    key:pieceKey,
                                    arr:bishopArr
                                }
                                res.push(node)
                            }
                        }
                        
                        // knight allies
                        if(key[1] === 'n') {

                        }
    
                        // rook allies
                        if(key[1] === 'r') {

                        }
                        
                        // queen allies
                        if(key[1] === 'q') {

                        }

                        // king white
                        if(key[1] === 'k') {

                        }
                    }
                }
            }
        }
        return res
    }

    static GetAllThreat(arrThreaten,king){
        let res = []
        
        arrThreaten.forEach(item => {
            let itemKey = item.elementId.split('-')[0].split('')

            // threaten by pawn
            if(itemKey[1] === 'p') {
                let pawnArr = PathController.GetPawnPathToKing(item,king)
                let itemKeyObject = GetKeyOnly(item.elementId)
                let node = {
                    key:itemKeyObject,
                    arr:pawnArr
                }
                res.push(node)
            }
            
            // threaten by bishop
            if(itemKey[1] === 'b') {
                let bishopArr = PathController.GetBishopPathToKing(item,king)
                let itemKeyObject = GetKeyOnly(item.elementId)
                let node = {
                    key:itemKeyObject,
                    arr:bishopArr
                }
                res.push(node)
            }
            
            // threaten by knight
            if(itemKey[1] === 'n') {
                let kingArr = PathController.GetKnightToKing(item,king)
                let itemKeyObject = GetKeyOnly(item.elementId)
                let node = {
                    key:itemKeyObject,
                    arr:kingArr
                }
                res.push(node)
            }
    
            // threaten by rook 
            if(itemKey[1] === 'r') {
                let rookArr = PathController.GetRookPathToKing(item,king)
                let itemKeyObject = GetKeyOnly(item.elementId)
                let node = {
                    key:itemKeyObject,
                    arr:rookArr
                }
                res.push(node)
            }
            
            // threaten by queen 
            if(itemKey[1] === 'q') {
                let queenArr = PathController.GetQueenPathToKing(item,king)
                let itemKeyObject = GetKeyOnly(item.elementId)
                let node = {
                    key:itemKeyObject,
                    arr:queenArr
                }
                res.push(node)
            }  
        })

        return res
    }
    

    // return gerakan untuk piece tertentu
    static RespondKingThreaten(piece,arrThreaten,isWhite){
        let key = piece.elementId.split('-')[0].split('')
        
        let res = []
        // the threaten king is white
        if(isWhite){
            let king = GetKeyPieces('wk')
            let threatPath = this.GetAllThreat(arrThreaten,king)
            let possibleMove = this.GetAllPossibleMoves(isWhite)

            console.log(threatPath,possibleMove)

            // piece is pawn
            if(key[1] === 'p') {

            }
    
            // piece is bishop
            if(key[1] === 'b') {
    
            }
            
            // piece is knight
            if(key[1] === 'n') {
    
            }
    
            // piece is rook 
            if(key[1] === 'r') {
    
            }
            
            // piece is queen 
            if(key[1] === 'q') {
    
            }

            // piece is king 
            if(key[1] === 'k') {
    
            }  
        } 

        // the threaten king is black
        else {
            let king = GetKeyPieces('bk')
            let threatPath = this.GetAllThreat(arrThreaten,king)
            let possibleMove = this.GetAllPossibleMoves(isWhite)

            console.log(threatPath,possibleMove)

            // piece is pawn
            if(key[1] === 'p') {

            }
        }

    }
}