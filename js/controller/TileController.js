import { Variable } from "../config/Variable.js"
import { Tile } from "../model/Tile.js"

export class TileController {
    static TileEventListener(tilePosition) {
        document.getElementById(tilePosition).addEventListener('click', () => {
            console.log(tilePosition)
            Variable.tilePosition = tilePosition
            
            if(Variable.isClickedPiece && Variable.currentElement !== null) {
                const elementId = Variable.currentElement.elementId
                const tileId = Variable.currentElement.piecePosition 

                if(tilePosition != tileId && Variable.currentElement.ValidMoves(parseInt(tilePosition))) {
                    console.log('valid tile to move')
                    this.HandlePieceMovement(elementId,tilePosition)
                }
            }
        })
    }

    static IsTileHaveChildren(tilePosition) {
        let tileElement = document.getElementById(tilePosition)
        if(tileElement.hasChildNodes()) return true
        return false
    }

    static GetChildrenElement(tilePosition) {
        let tileElement = document.getElementById(tilePosition)
        return tileElement.firstElementChild
    }

    static HandlePieceMovement(elementId, tilePosition) {

        let piece = document.getElementById(elementId)

        // RETURN BACK THE TILE COLOR
        const parentElement = piece.closest(Variable.tileClass)
        parentElement.style.backgroundColor = Tile.CalculateBackground(parentElement.id)

        // MOVE THE PIECE
        let targetTile = document.getElementById(tilePosition)
        piece.parentNode.removeChild(piece)
        targetTile.appendChild(piece)
        
        // UPDATE THE ELEMENT STATE
        Variable.currentElement.isClicked = false
        Variable.currentElement.piecePosition = tilePosition
        
        // RESET THE STATE OF VARIABLE
        Variable.ResetState()
    }
}