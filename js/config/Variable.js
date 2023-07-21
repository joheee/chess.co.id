export class Variable {
    // BOARD
    static isWhiteMove = true
    static firstTile = '#769656'
    static secondTile = '#eeeed2'
    static validPathTile = '#ffff00'
    static clickedTile = '#fff35f'
    static tileClass = '.tile-height-width'

    // STATE OF ELEMENT
    static isClickedPiece = false
    static tilePosition = -23
    static currentElement = null
    static parentElement = null

    // TIME
    static timePlayed = 0

    static ResetState(){
        this.isClickedPiece = false
        this.tilePosition = -23
        this.currentElement = null
        this.parentElement = null
    }
}