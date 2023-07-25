import { Variable } from "../config/Variable.js"
import { Pawn } from "../model/Pawn.js"
import { Tile } from "../model/Tile.js"
import { PieceController } from "./PieceController.js"

export class TileController {
    static TileEventListener(tilePosition) {
        document.getElementById(tilePosition).addEventListener('click', () => {
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
        if(piece !== null) {
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
            
            // pawn promote straight to queen
            const [yDest, xDest] = Tile.GetXYTile(tilePosition)

            if((yDest === 8 || yDest === 1) && Variable.currentElement instanceof Pawn) {
                PieceController.PromoteToQueen(Variable.currentElement, tilePosition)
            }   

            // RESET THE STATE OF VARIABLE
            Variable.ResetState()
        }
    }
}