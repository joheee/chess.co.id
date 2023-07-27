import { GameStateController } from "../controller/GameStateController.js"

export class Variable {
    // BOARD
    static isWhiteMove = true
    static firstTile = '#769656'
    static secondTile = '#eeeed2'
    static validPathTile = '#ffff00'
    static clickedTile = '#fff35fbb'
    static checkTile = '#FF8989bb'
    static tileClass = '.tile-height-width'

    // STATE OF ELEMENT
    static isClickedPiece = false
    static tilePosition = -23
    static currentElement = null
    static parentElement = null

    // TIME
    static timePlayed = 0

    // TOTAL WHITE AND BLACK QUEEN
    static totalWhiteQueen = 1
    static totalBlackQueen = 1

    // BOOLEAN FOR CHECKMATES CONFIRMATION
    static isBlackCheckMate = false
    static isWhiteCheckMate = false

    static ResetState(){
        this.isClickedPiece = false
        this.tilePosition = -23
        this.currentElement = null
        this.parentElement = null
        this.isWhiteMove = !this.isWhiteMove

        GameStateController.DefineClock()
    }
}