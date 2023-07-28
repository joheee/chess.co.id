import { Board } from "./component/Board.js"
import { IntializeBoardColor } from "./component/InitColor.js"
import { Player } from "./component/Player.js"
import { GetElement } from "./config/Element.js"
import { Index } from "./logic/Control.js"
import { Time } from "./logic/Time.js"
import { Bishop } from "./model/Bishop.js"
import { King } from "./model/King.js"
import { Knight } from "./model/Knight.js"
import { Pawn } from "./model/Pawn.js"
import { Queen } from "./model/Queen.js"
import { Rook } from "./model/Rook.js"
import { LocalStorage } from "./navigation/LocalStorage.js"
import { Navigation } from "./navigation/Navigation.js"
import { Variable } from './config/Variable.js'

// INITIALIZE BOARD AND PIECES
const chessBoard = GetElement('id', 'chess-board')
const boardTiles = Board()
boardTiles.forEach(row => {
    row.forEach(tile => {
        chessBoard.appendChild(tile)
    })
})

// INITIALIZE NAVIGATION
const navigation = new Navigation()

// INITIALIZE OBJECT
let Tiles = IntializeBoardColor()

// DISPLAY RANDOM PLAYER NAME
Player.DisplayPlayerName()

// INITIALIZE PAWN
export const WhitePieces = {
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
    WhiteQueen_1 : new Queen(false, 14, true, 'wq-1'),
    WhiteKing : new King(false, 15, true, 'wk'),
}

export const BlackPieces = {
    BlackPawn_1 : new Pawn(false, 71, false, 'bp-1'),
    BlackPawn_2 : new Pawn(false, 72, false, 'bp-2'),
    BlackPawn_3 : new Pawn(false, 73, false, 'bp-3'),
    BlackPawn_4 : new Pawn(false, 74, false, 'bp-4'),
    BlackPawn_5 : new Pawn(false, 75, false, 'bp-5'),
    BlackPawn_6 : new Pawn(false, 76, false, 'bp-6'),
    BlackPawn_7 : new Pawn(false, 77, false, 'bp-7'),
    BlackPawn_8 : new Pawn(false, 78, false, 'bp-8'),
    BlackRook_1 : new Rook(false, 81, false, 'br-1'),
    BlackRook_2 : new Rook(false, 88, false, 'br-2'),
    BlackKnight_1 : new Knight(false, 82, false, 'bn-1'),
    BlackKnight_2 : new Knight(false, 87, false, 'bn-2'),
    BlackBishop_1 : new Bishop(false, 83, false, 'bb-1'),
    BlackBishop_2 : new Bishop(false, 86, false, 'bb-2'),
    BlackQueen_1 : new Queen(false, 84, false, 'bq-1'),
    BlackKing : new King(false, 85, false, 'bk'),
}

// INITIALIZE CLOCK
export const WhiteClock = new Time('white-clock')
export const BlackClock = new Time('black-clock')
WhiteClock.DisplayClock()
BlackClock.DisplayClock()
