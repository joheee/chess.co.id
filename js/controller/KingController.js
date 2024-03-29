import { Variable } from "../config/Variable.js";
import { BlackClock, BlackPieces, WhiteClock, WhitePieces } from "../index.js";
import { GetKeyOnly, GetKeyPieces } from "../logic/Control.js";
import { Knight } from "../model/Knight.js";
import { Tile } from "../model/Tile.js";
import { Navigation } from "../navigation/Navigation.js";
import { PathController } from "./PathController.js";
import { PieceController } from "./PieceController.js";
import { SoundController } from "./SoundController.js";
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
        console.log(isWhite)
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
                            if(!allies.isFirstMove && !TileController.IsTileHaveChildren(frontTile) && !TileController.IsTileHaveChildren(firstMoveTile)) {
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
                                console.log(TileController.IsTileHaveChildren(rightDiagonalTile), TileController.GetChildrenElement(rightDiagonalTile), rightDiagonalTile)
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
                            let knightArr = []

                            // coordinates
                            let TopLeftTile = (y + 2) * 10 + x-1 
                            Knight.KnightPossibleMoves(TopLeftTile, knightArr, isWhite)
                            let TopBottomMoves = (y + 2) * 10 + x+1  
                            Knight.KnightPossibleMoves(TopBottomMoves, knightArr, isWhite)
                            let LeftTopMoves = (y - 1) * 10 + x+2   
                            Knight.KnightPossibleMoves(LeftTopMoves, knightArr, isWhite)
                            let LeftBottomMoves = (y - 1) * 10 + x-2  
                            Knight.KnightPossibleMoves(LeftBottomMoves, knightArr, isWhite)
                            let RightTopMoves = (y + 1) * 10 + x+2
                            Knight.KnightPossibleMoves(RightTopMoves, knightArr, isWhite)
                            let RightBottomMoves = (y + 1) * 10 + x-2  
                            Knight.KnightPossibleMoves(RightBottomMoves, knightArr, isWhite)
                            let BottomLeftMoves = (y - 2) * 10 + x-1  
                            Knight.KnightPossibleMoves(BottomLeftMoves, knightArr, isWhite)
                            let BottomRightMovex = (y - 2) * 10 + x+1 
                            Knight.KnightPossibleMoves(BottomRightMovex, knightArr, isWhite)


                            if(knightArr.length !== 0) {
                                let node = {
                                    key:pieceKey,
                                    arr:knightArr
                                }
                                res.push(node)
                            }
                        }
    
                        // rook allies
                        if(key[1] === 'r') {
                            let rookArr = []
                            // Highlight valid tiles in upward direction
                            for (let i = y - 1; i >= 1; i--) {
                                let tile = i * 10 + x;
                                if (TileController.IsTileHaveChildren(tile)) {
                                    let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                                    if (!item.isWhite) rookArr.push(tile)
                                    break;
                                }
                                rookArr.push(tile)
                            }
                        
                            // Highlight valid tiles in downward direction
                            for (let i = y + 1; i <= 8; i++) {
                                let tile = i * 10 + x;
                                if (TileController.IsTileHaveChildren(tile)) {
                                    let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                                    if (!item.isWhite) rookArr.push(tile)
                                    break;
                                }
                                Tile.HintBackground(tile);
                                rookArr.push(tile)

                            }
                        
                            // Highlight valid tiles in left direction
                            for (let j = x - 1; j >= 1; j--) {
                                let tile = y * 10 + j;
                                if (TileController.IsTileHaveChildren(tile)) {
                                    let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                                    if (!item.isWhite) rookArr.push(tile)
                                    break;
                                }
                                rookArr.push(tile)

                            }
                        
                            // Highlight valid tiles in right direction
                            for (let j = x + 1; j <= 8; j++) {
                                let tile = y * 10 + j;
                                if (TileController.IsTileHaveChildren(tile)) {
                                    let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                                    if (!item.isWhite) rookArr.push(tile)
                                    
                                    break;
                                }
                                rookArr.push(tile)
                            }
                            
                            if(rookArr.length !== 0) {
                                let node = {
                                    key:pieceKey,
                                    arr:rookArr
                                }
                                res.push(node)
                            }
                        }
                        
                        // queen allies
                        if(key[1] === 'q') {
                            let queenArr = []
                            // Highlight valid tiles in upward direction (same as rook's logic)
                            for (let i = y - 1; i >= 1; i--) {
                                let tile = i * 10 + x;
                                if (TileController.IsTileHaveChildren(tile)) {
                                    let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                                    if (!item.isWhite) {
                                    queenArr.push(tile)
                                    }
                                    break;
                                }
                                queenArr.push(tile)
                            }

                            // Highlight valid tiles in downward direction (same as rook's logic)
                            for (let i = y + 1; i <= 8; i++) {
                                let tile = i * 10 + x;
                                if (TileController.IsTileHaveChildren(tile)) {
                                    let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                                    if (!item.isWhite) {
                                    queenArr.push(tile)
                                    }
                                    break;
                                }
                                queenArr.push(tile)
                            }

                            // Highlight valid tiles in left direction (same as rook's logic)
                            for (let j = x - 1; j >= 1; j--) {
                                let tile = y * 10 + j;
                                if (TileController.IsTileHaveChildren(tile)) {
                                    let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                                    if (!item.isWhite) {
                                    queenArr.push(tile)
                                    }
                                    break;
                                }
                                queenArr.push(tile)
                            }

                            // Highlight valid tiles in right direction (same as rook's logic)
                            for (let j = x + 1; j <= 8; j++) {
                                let tile = y * 10 + j;
                                if (TileController.IsTileHaveChildren(tile)) {
                                    let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                                    if (!item.isWhite) {
                                    queenArr.push(tile)
                                    }
                                    break;
                                }
                                queenArr.push(tile)
                            }

                            // Highlight valid tiles in top-left diagonal direction (same as bishop's logic)
                            for (let i = y - 1, j = x - 1; i >= 1 && j >= 1; i--, j--) {
                                let tile = i * 10 + j;
                                if (TileController.IsTileHaveChildren(tile)) {
                                    let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                                    if (!item.isWhite) {
                                    queenArr.push(tile)
                                    }
                                    break;
                                }
                                queenArr.push(tile)
                            }

                            // Highlight valid tiles in top-right diagonal direction (same as bishop's logic)
                            for (let i = y - 1, j = x + 1; i >= 1 && j <= 8; i--, j++) {
                                let tile = i * 10 + j;
                                if (TileController.IsTileHaveChildren(tile)) {
                                    let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                                    if (!item.isWhite) {
                                    queenArr.push(tile)
                                    }
                                    break;
                                }
                                queenArr.push(tile)
                            }

                            // Highlight valid tiles in bottom-left diagonal direction (same as bishop's logic)
                            for (let i = y + 1, j = x - 1; i <= 8 && j >= 1; i++, j--) {
                                let tile = i * 10 + j;
                                if (TileController.IsTileHaveChildren(tile)) {
                                    let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                                    if (!item.isWhite) {
                                    queenArr.push(tile)
                                    }
                                    break;
                                }
                                queenArr.push(tile)
                            }

                            // Highlight valid tiles in bottom-right diagonal direction (same as bishop's logic)
                            for (let i = y + 1, j = x + 1; i <= 8 && j <= 8; i++, j++) {
                                let tile = i * 10 + j;
                                if (TileController.IsTileHaveChildren(tile)) {
                                    let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                                    if (!item.isWhite) {
                                    queenArr.push(tile)
                                    }
                                    break;
                                }
                                queenArr.push(tile)
                            }

                            if(queenArr.length !== 0) {
                                let node = {
                                    key:pieceKey,
                                    arr:queenArr
                                }
                                res.push(node)
                            }
                        }

                        // king white
                        if(key[1] === 'k') {
                            let kingArr = []
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
                                        kingArr.push(tile)
                                    } else {
                                        const item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                                        if (!item.isWhite) {
                                            kingArr.push(tile)
                                        }
                                    }
                                }
                            }
                            
                            if(kingArr.length !== 0) {
                                let node = {
                                    key:pieceKey,
                                    arr:kingArr
                                }
                                res.push(node)
                            }
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
                            let knightArr = []

                            // coordinates
                            let TopLeftTile = (y + 2) * 10 + x-1 
                            Knight.KnightPossibleMoves(TopLeftTile, knightArr, isWhite)
                            let TopBottomMoves = (y + 2) * 10 + x+1  
                            Knight.KnightPossibleMoves(TopBottomMoves, knightArr, isWhite)
                            let LeftTopMoves = (y - 1) * 10 + x+2   
                            Knight.KnightPossibleMoves(LeftTopMoves, knightArr, isWhite)
                            let LeftBottomMoves = (y - 1) * 10 + x-2  
                            Knight.KnightPossibleMoves(LeftBottomMoves, knightArr, isWhite)
                            let RightTopMoves = (y + 1) * 10 + x+2
                            Knight.KnightPossibleMoves(RightTopMoves, knightArr, isWhite)
                            let RightBottomMoves = (y + 1) * 10 + x-2  
                            Knight.KnightPossibleMoves(RightBottomMoves, knightArr, isWhite)
                            let BottomLeftMoves = (y - 2) * 10 + x-1  
                            Knight.KnightPossibleMoves(BottomLeftMoves, knightArr, isWhite)
                            let BottomRightMovex = (y - 2) * 10 + x+1 
                            Knight.KnightPossibleMoves(BottomRightMovex, knightArr, isWhite)


                            if(knightArr.length !== 0) {
                                let node = {
                                    key:pieceKey,
                                    arr:knightArr
                                }
                                res.push(node)
                            }
                        }
    
                        // rook allies
                        if(key[1] === 'r') {
                            let rookArr = []
                            // Highlight valid tiles in upward direction
                            for (let i = y - 1; i >= 1; i--) {
                                let tile = i * 10 + x;
                                if (TileController.IsTileHaveChildren(tile)) {
                                    let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                                    if (item.isWhite) rookArr.push(tile)
                                    break;
                                }
                                rookArr.push(tile)
                            }
                        
                            // Highlight valid tiles in downward direction
                            for (let i = y + 1; i <= 8; i++) {
                                let tile = i * 10 + x;
                                if (TileController.IsTileHaveChildren(tile)) {
                                    let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                                    if (item.isWhite) rookArr.push(tile)
                                    break;
                                }
                                Tile.HintBackground(tile);
                                rookArr.push(tile)

                            }
                        
                            // Highlight valid tiles in left direction
                            for (let j = x - 1; j >= 1; j--) {
                                let tile = y * 10 + j;
                                if (TileController.IsTileHaveChildren(tile)) {
                                    let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                                    if (item.isWhite) rookArr.push(tile)
                                    break;
                                }
                                rookArr.push(tile)

                            }
                        
                            // Highlight valid tiles in right direction
                            for (let j = x + 1; j <= 8; j++) {
                                let tile = y * 10 + j;
                                if (TileController.IsTileHaveChildren(tile)) {
                                    let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                                    if (item.isWhite) rookArr.push(tile)
                                    
                                    break;
                                }
                                rookArr.push(tile)
                            }
                            
                            if(rookArr.length !== 0) {
                                let node = {
                                    key:pieceKey,
                                    arr:rookArr
                                }
                                res.push(node)
                            }
                        }
                        
                        // queen allies
                        if(key[1] === 'q') {
                            let queenArr = []
                            // Highlight valid tiles in upward direction (same as rook's logic)
                            for (let i = y - 1; i >= 1; i--) {
                                let tile = i * 10 + x;
                                if (TileController.IsTileHaveChildren(tile)) {
                                    let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                                    if (item.isWhite) {
                                    queenArr.push(tile)
                                    }
                                    break;
                                }
                                queenArr.push(tile)
                            }

                            // Highlight valid tiles in downward direction (same as rook's logic)
                            for (let i = y + 1; i <= 8; i++) {
                                let tile = i * 10 + x;
                                if (TileController.IsTileHaveChildren(tile)) {
                                    let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                                    if (item.isWhite) {
                                    queenArr.push(tile)
                                    }
                                    break;
                                }
                                queenArr.push(tile)
                            }

                            // Highlight valid tiles in left direction (same as rook's logic)
                            for (let j = x - 1; j >= 1; j--) {
                                let tile = y * 10 + j;
                                if (TileController.IsTileHaveChildren(tile)) {
                                    let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                                    if (item.isWhite) {
                                    queenArr.push(tile)
                                    }
                                    break;
                                }
                                queenArr.push(tile)
                            }

                            // Highlight valid tiles in right direction (same as rook's logic)
                            for (let j = x + 1; j <= 8; j++) {
                                let tile = y * 10 + j;
                                if (TileController.IsTileHaveChildren(tile)) {
                                    let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                                    if (item.isWhite) {
                                    queenArr.push(tile)
                                    }
                                    break;
                                }
                                queenArr.push(tile)
                            }

                            // Highlight valid tiles in top-left diagonal direction (same as bishop's logic)
                            for (let i = y - 1, j = x - 1; i >= 1 && j >= 1; i--, j--) {
                                let tile = i * 10 + j;
                                if (TileController.IsTileHaveChildren(tile)) {
                                    let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                                    if (item.isWhite) {
                                    queenArr.push(tile)
                                    }
                                    break;
                                }
                                queenArr.push(tile)
                            }

                            // Highlight valid tiles in top-right diagonal direction (same as bishop's logic)
                            for (let i = y - 1, j = x + 1; i >= 1 && j <= 8; i--, j++) {
                                let tile = i * 10 + j;
                                if (TileController.IsTileHaveChildren(tile)) {
                                    let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                                    if (item.isWhite) {
                                    queenArr.push(tile)
                                    }
                                    break;
                                }
                                queenArr.push(tile)
                            }

                            // Highlight valid tiles in bottom-left diagonal direction (same as bishop's logic)
                            for (let i = y + 1, j = x - 1; i <= 8 && j >= 1; i++, j--) {
                                let tile = i * 10 + j;
                                if (TileController.IsTileHaveChildren(tile)) {
                                    let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                                    if (item.isWhite) {
                                    queenArr.push(tile)
                                    }
                                    break;
                                }
                                queenArr.push(tile)
                            }

                            // Highlight valid tiles in bottom-right diagonal direction (same as bishop's logic)
                            for (let i = y + 1, j = x + 1; i <= 8 && j <= 8; i++, j++) {
                                let tile = i * 10 + j;
                                if (TileController.IsTileHaveChildren(tile)) {
                                    let item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                                    if (item.isWhite) {
                                    queenArr.push(tile)
                                    }
                                    break;
                                }
                                queenArr.push(tile)
                            }

                            if(queenArr.length !== 0) {
                                let node = {
                                    key:pieceKey,
                                    arr:queenArr
                                }
                                res.push(node)
                            }
                        }

                        // king black
                        if(key[1] === 'k') {
                            let kingArr = []
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
                                        kingArr.push(tile)
                                    } else {
                                        const item = GetKeyPieces(TileController.GetChildrenElement(tile).id);
                                        if (item.isWhite) {
                                            kingArr.push(tile)
                                        }
                                    }
                                }
                            }
                            
                            if(kingArr.length !== 0) {
                                let node = {
                                    key:pieceKey,
                                    arr:kingArr
                                }
                                res.push(node)
                            }
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

        // store the path
        let res = []
        // store the possible move of an array
        let piecePossibleMoveArr = []

        // the threaten king is white
        let king = isWhite ? GetKeyPieces('wk') : GetKeyPieces('bk')

        let threatPath = this.GetAllThreat(arrThreaten,king)
        let possibleMove = this.GetAllPossibleMoves(isWhite)
        let enemyMove = this.GetAllPossibleMoves(!isWhite)
        
        // no possible move
        if (possibleMove.length === 0) return []

        // check king atau bukan
        if(piece.elementId !== 'wk' && piece.elementId !== 'bk') {
            let itemKeyObject = GetKeyOnly(piece.elementId)
            let currentPossibleMove = possibleMove.filter(move => move.key === itemKeyObject)[0]

            // exist the way
            if(currentPossibleMove !== undefined) {
                threatPath.forEach(threat => {
                    for(let i=0;i<threat.arr.length-1;i++){
                        let tile = threat.arr[i]
                        currentPossibleMove.arr.forEach(pieceMove => {
                            if(pieceMove === tile) {
                                let node = {
                                    threat: threat.key,
                                    proctect: itemKeyObject,
                                    tile:pieceMove
                                }
                                piecePossibleMoveArr.push(node)
                            }
                        });
                    }
                })

                // minimize threat
                let compareWithThreatArr = []
                threatPath.forEach(threat => {
                    for(let i=0;i<piecePossibleMoveArr.length;i++){
                        let move = piecePossibleMoveArr[i]
                        if(threat.key === move.threat) {
                            compareWithThreatArr.push(move.threat)
                            break
                        }
                    }
                })
                piecePossibleMoveArr.forEach(move => {
                    res.push(move.tile)
                })
            }
        } 
        
        // si king
        else {
            let itemKeyObject = GetKeyOnly(piece.elementId)
            let currentPossibleMove = possibleMove.filter(move => move.key === itemKeyObject)[0]

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
        }

        // either checkmate or draw
        if(res.length === 0) return res

        // checking the list of move is giving possibility to discover check, or guarded threat

        return res
    }

    static HandleKingStatus() {
        let whiteKing = GetKeyPieces('wk')
        let blackKing = GetKeyPieces('bk')

        console.log(whiteKing,blackKing)
        if(whiteKing.isCaptured || blackKing.isCaptured) {
            Navigation.WinningPopUp(Variable.isWhiteMove ? 'Black Won' : 'White Won', true) 
            Navigation.WinningPopUp(Variable.isWhiteMove ? 'Black Won' : 'White Won', true) 
        }

        if(this.CheckKingIsThreaten(Variable.isWhiteMove)) {
            // continue the game
            
            SoundController.PlaySoundCaptureOnce()
            
            // checkmate 
            console.log(this.IsCheckMate(Variable.isWhiteMove))
            if(this.IsCheckMate(Variable.isWhiteMove)) {
                console.log('skakmat woe')
                Navigation.WinningPopUp(Variable.isWhiteMove ? 'Black Won' : 'White Won', true) 
                return
            }

            let kingId = Variable.isWhiteMove ? 'wk' : 'bk'
            const imageElement = document.getElementById(kingId)
            const parentElement = imageElement.closest(Variable.tileClass)
            parentElement.style.backgroundColor = Variable.checkTile

        } else {
            let kingId = Variable.isWhiteMove ? 'wk' : 'bk'
            let piece = GetKeyPieces(kingId)
            let parent = document.getElementById(piece.piecePosition)
            let x = piece.piecePosition % 10
            let y = (piece.piecePosition - x) / 10
            parent.style.backgroundColor = Tile.CalculateBackground([x,y])
        }
    }


    // CHECKMATE
    static IsCheckMate(isWhite){

        let king = isWhite ? GetKeyPieces('wk') : GetKeyPieces('bk')

        if(king.isCaptured === true) return false

        let kingKey = isWhite ? 'WhiteKing' : 'BlackKing'
        
        let arrThreaten = KingController.GetKingThreaten(isWhite)
        
        let threatPath = this.GetAllThreat(arrThreaten,king)
        let possibleMove = this.GetAllPossibleMoves(isWhite)
        let enemyMove = this.GetAllPossibleMoves(!isWhite)
        // let enemyPossibleMove = this.GetAllPossibleMoves(!isWhite)
        let res = null

        // other piece can protect or kill the threat
        for(let i=0;i<possibleMove.length;i++){
            let move = possibleMove[i].arr
            move.forEach(m => {
                threatPath.forEach(t => {
                    t.arr.forEach(p => {
                        if(m === p) {
                            if(possibleMove[i].key !== 'WhiteKing' && possibleMove[i].key !== 'BlackKing') {
                                res = 1
                            }
                        }
                    })
                })
            })
        }

        if(res !== null) return false
        
        // checkmate is confirmed
        WhiteClock.stopCountdown()
        BlackClock.stopCountdown()

        return true
    }
}