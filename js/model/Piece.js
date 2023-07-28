import { Variable } from "../config/Variable.js"
import { KingController } from "../controller/KingController.js"
import { GetKeyPieces } from "../logic/Control.js"
import { Tile } from "./Tile.js"

export class Piece {
    constructor(isCaptured, piecePosition, isWhite, elementId){
        this.isCaptured = isCaptured
        this.piecePosition = piecePosition
        this.isWhite = isWhite
        this.elementId = elementId
        this.isClicked = false
        this.ValidateCaptured()
    }

    ClickedPiece = () => {

        const imageElement = document.getElementById(this.elementId);
        const parentElement = imageElement.closest(Variable.tileClass);
    
        // Check if it's the correct color's turn to move
        if (this.isWhite !== Variable.isWhiteMove) return false;
    
        // Handle click for the current piece
        if (!this.isClicked) {
            // If there's a currently selected piece, turn it off
            if (Variable.currentElement) {
                Tile.ResetBackground();
                Tile.ResetHintBackground();
                const prevElement = document.getElementById(Variable.currentElement.elementId);
                const prevParentElement = prevElement.closest(Variable.tileClass);
                prevParentElement.style.backgroundColor = Tile.CalculateBackground(prevParentElement.id);
                Variable.currentElement.isClicked = false;
            }
    
            Tile.ResetBackground();
            Tile.ResetHintBackground();
            parentElement.style.backgroundColor = Variable.clickedTile;
            this.isClicked = true;
        
            Variable.isClickedPiece = true;
            Variable.currentElement = this;
            return true;
        }
    
        // If the same piece is clicked again, turn it off
        parentElement.style.backgroundColor = Tile.CalculateBackground(parentElement.id);
        this.isClicked = false;
        Variable.isClickedPiece = false;
        Variable.currentElement = null;
        Tile.ResetBackground();
        Tile.ResetHintBackground();
        return false;
    };

    MovementListener = () => {
        document.getElementById(this.elementId).addEventListener('click', this.MovementMechanism)
    }
    
    MovementMechanism = () => {}

    ValidMoves = (dest) => {}

    ValidateCaptured() {
        if(this.isCaptured) document.getElementById(this.elementId).style.display = 'none'
        else document.getElementById(this.elementId).style.display = 'block'
    }
}
