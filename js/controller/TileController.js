import { Variable } from "../config/Variable.js"
import { Pawn } from "../model/Pawn.js"
import { Tile } from "../model/Tile.js"
import { KingController } from "./KingController.js"
import { PieceController } from "./PieceController.js"
import { SoundController } from "./SoundController.js"

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

                    // check king is threaten
                    if(KingController.CheckKingIsThreaten(Variable.isWhiteMove)) {

                        SoundController.PlaySoundCaptureOnce()

                        // checkmate white
                        if(Variable.isWhiteCheckMate) {
                            console.log('skakmat putih woe')
                        }
                        
                        // checkmate black
                        if(Variable.isBlackCheckMate) {
                            console.log('skakmat item woe')
                        }


                        let kingId = Variable.isWhiteMove ? 'wk' : 'bk'
                        const imageElement = document.getElementById(kingId)
                        const parentElement = imageElement.closest(Variable.tileClass)
                        parentElement.style.backgroundColor = Variable.checkTile
                    } 
                    
                }
            }
        })
    }

    static IsTileHaveChildren(tilePosition) {
        let x = tilePosition % 10
        let y = (tilePosition - x) / 10
        let boundaries = x >= 1 && x <= 8 && y >= 1 && y <= 8
        if(!boundaries) return false

        let tileElement = document.getElementById(tilePosition)
        let childElements = tileElement.children
        if(childElements === null) return false
        if(tileElement.hasChildNodes()) {
            for (let i = 0; i < childElements.length; i++) {
                // child that doesnt have class hint-movement
                if(!childElements[i].classList.contains('hint-movement')){
                  return true;
                }
              }
        } 
        
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
            Tile.ResetBackground()

            // RESET HINT TILE COLOR
            Tile.ResetHintBackground()
            
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
            
            // continue the game
            Variable.IsGameContinue()

            // PLAY THE HELLA SOUND
            SoundController.PlaySoundMoveOnce()
        }
    }
}