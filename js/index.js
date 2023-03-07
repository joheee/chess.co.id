import { Board } from "./component/Board.js"
import { GetElement } from "./config/Element.js"

const chessBoard = GetElement('id', 'chess-board')
const boardTiles = Board()

boardTiles.forEach(row => {
    row.forEach(tile => {
        chessBoard.appendChild(tile)
    })
})