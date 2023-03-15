import { Board } from "./component/Board.js"
import { IntializeBoardColor } from "./component/InitColor.js"
import { GetElement } from "./config/Element.js"
import { Index } from "./logic/Control.js"
import { Bishop } from "./model/Bishop.js"
import { King } from "./model/King.js"
import { Knight } from "./model/Knight.js"
import { Pawn } from "./model/Pawn.js"
import { Queen } from "./model/Queen.js"
import { Rook } from "./model/Rook.js"

// INITIALIZE BOARD AND PIECES
const chessBoard = GetElement('id', 'chess-board')
const boardTiles = Board()
boardTiles.forEach(row => {
    row.forEach(tile => {
        chessBoard.appendChild(tile)
    })
})


// INITIALIZE OBJECT
let Tiles = IntializeBoardColor()
console.log(Tiles[Index(1)][Index(1)])

const WhitePieces = {
    WhitePawn_1 : new Pawn(false, 21, true, 'wp-1'),
    WhitePawn_2 : new Pawn(false, 22, true, 'wp-2'),
    WhitePawn_3 : new Pawn(false, 23, true, 'wp-3'),
    WhitePawn_4 : new Pawn(false, 24, true, 'wp-4'),
    WhitePawn_5 : new Pawn(false, 25, true, 'wp-5'),
    WhitePawn_6 : new Pawn(false, 26, true, 'wp-6'),
    WhitePawn_7 : new Pawn(false, 27, true, 'wp-7'),
    WhitePawn_8 : new Pawn(false, 28, true, 'wp-8'),

    WhiteRook_1 : new Rook(false, 11, true, 'wr-1'),
    WhiteRook_2 : new Rook(false, 18, true, 'wr-2'),

    WhiteKnight_1 : new Knight(false, 12, true, 'wn-1'),
    WhiteKnight_2 : new Knight(false, 17, true, 'wn-2'),

    WhiteBishop_1 : new Bishop(false, 13, true, 'wb-1'),
    WhiteBishop_2 : new Bishop(false, 16, true, 'wb-2'),
    
    WhiteQueen : new Queen(false, 14, true, 'wq'),
    WhiteKing : new King(false, 15, true, 'wk'),
}
