import { Board } from "./component/Board.js"
import { GetElement } from "./config/Element.js"
import { Pawn } from "./model/Pawn.js"

const chessBoard = GetElement('id', 'chess-board')
const boardTiles = Board()

boardTiles.forEach(row => {
    row.forEach(tile => {
        chessBoard.appendChild(tile)
    })
})

const WhitePawn = new Pawn(false, 11, true, 1, 'wp-1')
WhitePawn.PieceMove()